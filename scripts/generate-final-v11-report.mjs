import fs from 'node:fs/promises';
import path from 'node:path';
import { FileBlob, SpreadsheetFile, Workbook } from '@oai/artifact-tool';

const [sourcePath,outputPath,...manualReviewArgs]=process.argv.slice(2);
if(!sourcePath||!outputPath)throw new Error('Usage: node scripts/generate-final-v11-report.mjs <source.xlsx> <output.xlsx> [club|name ...]');
const outputDir=path.dirname(outputPath);
const manualReviewKeys=new Set(manualReviewArgs.map(v=>String(v).trim().toLowerCase()));
const source=await SpreadsheetFile.importXlsx(await FileBlob.load(sourcePath));
const raw=source.worksheets.getItem('Rdata').getUsedRange().values.slice(3).filter(r=>r[3]);
const wgRows=source.worksheets.getItem('Weight Gain').getUsedRange().values.slice(3).filter(r=>r[1]);
const key=(club,name)=>`${String(club).trim()}|${String(name).trim()}`.toLowerCase();
const wgKeys=new Set(wgRows.map(r=>key(r[2],r[1])));
const isNum=v=>typeof v==='number'&&Number.isFinite(v);
const nonEmpty=v=>v!==null&&v!==undefined&&String(v).trim()!=='';
const people=raw.map(r=>({source:r[0],sourceSheet:r[1],club:r[2],name:r[3],age:r[4],height:r[5],weight:[r[6],r[9],r[12],r[15],r[18]],fat:[r[7],r[10],r[13],r[16],r[19]],muscle:[r[8],r[11],r[14],r[17],r[20]],weightGain:wgKeys.has(key(r[2],r[3]))}));
const duplicateKeys=new Set();const counts=new Map();for(const p of people){const k=key(p.club,p.name);counts.set(k,(counts.get(k)??0)+1);}for(const [k,n] of counts)if(n>1)duplicateKeys.add(k);
const periods=[{code:'W1',label:'Baseline → Week 1',a:0,b:1,weekly:true},{code:'W2',label:'Week 1 → Week 2',a:1,b:2,weekly:true},{code:'W3',label:'Week 2 → Week 3',a:2,b:3,weekly:true},{code:'Overall',label:'Baseline → Final',a:0,b:4,weekly:false}];
const categories=[{id:'weight',label:'Weight Loss',primary:'weight'},{id:'fat',label:'Fat Loss',primary:'fat'},{id:'muscle',label:'Muscle Gain',primary:'muscle'}];
const sign=x=>x<0?'Loss':x>0?'Gain':'Stable';
function evaluate(p,period,category){
  const prev={weight:p.weight[period.a],fat:p.fat[period.a],muscle:p.muscle[period.a]},curr={weight:p.weight[period.b],fat:p.fat[period.b],muscle:p.muscle[period.b]};
  const values=[...Object.values(prev),...Object.values(curr)];const bad=values.some(v=>nonEmpty(v)&&!isNum(v));const missing=values.some(v=>!isNum(v));
  const change={weight:missing?null:curr.weight-prev.weight,fat:missing?null:curr.fat-prev.fat,muscle:missing?null:curr.muscle-prev.muscle};
  let status='INVALID',priority=null,reason='';let outlierMetrics=[];
  if(bad){reason='INVALID – BAD SOURCE DATA';return{p,period,category,prev,curr,change,status,priority,reason,outlierMetrics};}
  if(missing){if(period.code==='Overall'&&category.id==='weight'&&!isNum(curr.weight))reason='INVALID – FINAL WEEK DATA MISSING';else if(period.code==='Overall'&&category.id==='weight'&&!isNum(prev.weight))reason='INVALID – NO BASELINE DATA';else reason='INVALID – NO DATA AVAILABLE FOR COMPARISON';return{p,period,category,prev,curr,change,status,priority,reason,outlierMetrics};}
  if(duplicateKeys.has(key(p.club,p.name))){status='REVIEW';reason='REVIEW – DUPLICATE MEASUREMENT';return{p,period,category,prev,curr,change,status,priority,reason,outlierMetrics};}
  if(period.weekly){if(Math.abs(change.weight)>4)outlierMetrics.push('Weight');if(Math.abs(change.fat)>3)outlierMetrics.push('Fat');if(Math.abs(change.muscle)>3)outlierMetrics.push('Muscle');if(outlierMetrics.length){status='OUTLIER';reason=`OUTLIER – WEEKLY CHANGE EXCEEDS ALLOWED LIMIT (${outlierMetrics.join(', ')})`;return{p,period,category,prev,curr,change,status,priority,reason,outlierMetrics};}}
  if(manualReviewKeys.has(key(p.club,p.name))){status='REVIEW';reason='REVIEW REQUIRED – USER-FLAGGED SOURCE RESULT';return{p,period,category,prev,curr,change,status,priority,reason,outlierMetrics};}
  const w=change.weight,f=change.fat,m=change.muscle;
  if(category.id==='weight'){
    if(p.weightGain){reason='INVALID – WEIGHT GAIN PROGRAM PARTICIPANT';}
    else if(w===0){reason='INVALID – WEIGHT STABLE';}
    else if(w>0){reason='INVALID – WEIGHT GAIN';}
    else if(f<0&&m>0){status='VALID';priority=1;reason='VALID – Weight Loss + Fat Loss + Muscle Gain';}
    else if(f<0&&m===0){status='VALID';priority=2;reason='VALID – Weight Loss + Fat Loss + Muscle Stable';}
    else if(f<0&&m<0){status='VALID';priority=3;reason='VALID – Weight Loss + Fat Loss + Muscle Loss';}
    else if(f===0&&m>0){status='VALID';priority=4;reason='VALID – Weight Loss + Fat Stable + Muscle Gain';}
    else if(f===0&&m===0){status='VALID';priority=5;reason='VALID – Weight Loss + Fat Stable + Muscle Stable';}
    else if(f===0&&m<0){status='REVIEW';reason='REVIEW REQUIRED – Fat Stable + Muscle Loss';}
    else if(f>0&&m>=0){status='REVIEW';reason=`REVIEW REQUIRED – Fat Gain + Muscle ${m>0?'Gain':'Stable'}`;}
    else {reason='INVALID – Fat Gain + Muscle Loss';}
  } else if(category.id==='fat'){
    if(f>=0){reason=f===0?'INVALID – FAT STABLE':'INVALID – FAT DID NOT DECREASE';}
    else if(m>0&&w<0){status='VALID';priority=1;reason='VALID – Fat Loss + Muscle Gain + Weight Loss';}
    else if(m>0&&w===0){status='VALID';priority=2;reason='VALID – Fat Loss + Muscle Gain + Weight Stable';}
    else if(m===0&&w<0){status='VALID';priority=3;reason='VALID – Fat Loss + Muscle Stable + Weight Loss';}
    else if(m===0&&w===0){status='VALID';priority=4;reason='VALID – Fat Loss + Muscle Stable + Weight Stable';}
    else if(m>0&&w>0){status='VALID';priority=5;reason='VALID – Fat Loss + Muscle Gain + Weight Gain';}
    else if(m===0&&w>0){status='VALID';priority=6;reason='VALID – Fat Loss + Muscle Stable + Weight Gain';}
    else if(m<0&&w<=0){status='REVIEW';reason=`REVIEW REQUIRED – Fat Loss + Muscle Loss + Weight ${w<0?'Loss':'Stable'}`;}
    else {reason='INVALID – Fat Loss + Muscle Loss + Weight Gain';}
  } else {
    if(m<=0){reason=m===0?'INVALID – MUSCLE STABLE':'INVALID – MUSCLE DID NOT INCREASE';}
    else if(f<0&&w<0){status='VALID';priority=1;reason='VALID – Muscle Gain + Fat Loss + Weight Loss';}
    else if(f<0&&w===0){status='VALID';priority=2;reason='VALID – Muscle Gain + Fat Loss + Weight Stable';}
    else if(f<0&&w>0){status='VALID';priority=3;reason='VALID – Muscle Gain + Fat Loss + Weight Gain';}
    else if(f===0&&w<0){status='VALID';priority=4;reason='VALID – Muscle Gain + Fat Stable + Weight Loss';}
    else if(f===0&&w===0){status='VALID';priority=5;reason='VALID – Muscle Gain + Fat Stable + Weight Stable';}
    else if(f===0&&w>0){status='VALID';priority=6;reason='VALID – Muscle Gain + Fat Stable + Weight Gain';}
    else if(f>0&&w>0){status='VALID';priority=7;reason='VALID – Muscle Gain + Fat Gain + Weight Gain';}
    else if(f>0&&w===0){status='VALID';priority=8;reason='VALID – Muscle Gain + Fat Gain + Weight Stable';}
    else {reason='INVALID – Muscle Gain + Fat Gain + Weight Loss';}
  }
  return{p,period,category,prev,curr,change,status,priority,reason,outlierMetrics};
}

const records=[];for(const period of periods)for(const category of categories)for(const p of people)records.push(evaluate(p,period,category));
const statusOrder={VALID:0,REVIEW:1,OUTLIER:2,INVALID:3};
function comparator(a,b){if(statusOrder[a.status]!==statusOrder[b.status])return statusOrder[a.status]-statusOrder[b.status];if(a.status!=='VALID')return a.p.name.localeCompare(b.p.name);const c=a.category.id;if(c==='weight'){return a.change.weight-b.change.weight||a.priority-b.priority||b.change.muscle-a.change.muscle||a.change.fat-b.change.fat||a.p.name.localeCompare(b.p.name);}if(c==='fat'){return a.change.fat-b.change.fat||a.priority-b.priority||b.change.muscle-a.change.muscle||a.change.weight-b.change.weight||a.p.name.localeCompare(b.p.name);}return b.change.muscle-a.change.muscle||a.priority-b.priority||a.change.fat-b.change.fat||a.change.weight-b.change.weight||a.p.name.localeCompare(b.p.name);}
for(const period of periods)for(const category of categories){const valid=records.filter(r=>r.period===period&&r.category===category&&r.status==='VALID').sort(comparator);let rank=0,prevKey=null,position=0;const groupCounts=new Map();for(const r of valid){const tieKey=category.id==='weight'?`${r.change.weight}|${r.priority}|${r.change.muscle}|${r.change.fat}`:category.id==='fat'?`${r.change.fat}|${r.priority}|${r.change.muscle}|${r.change.weight}`:`${r.change.muscle}|${r.priority}|${r.change.fat}|${r.change.weight}`;r.tieKey=tieKey;groupCounts.set(tieKey,(groupCounts.get(tieKey)??0)+1);}for(const r of valid){position++;if(r.tieKey!==prevKey)rank=position;r.rank=rank;r.tie=groupCounts.get(r.tieKey)>1;if(r.tie)r.reason+= ' — SAME RANK; MANUAL REVIEW FOR PRIZE ORDER';prevKey=r.tieKey;}}

const wb=Workbook.create();const font='Arial';const colors={navy:'#17365D',blue:'#2F75B5',light:'#D9EAF7',green:'#E2F0D9',yellow:'#FFF2CC',red:'#FCE4D6',gray:'#666666',border:'#D9E2F3'};
function base(sh,title,lastCol,end){sh.showGridLines=false;sh.getRange('A1').values=[[title]];sh.getRange(`A1:${lastCol}1`).format.font={name:font,size:14,bold:true,color:colors.navy};sh.getRange(`A3:${lastCol}3`).format={fill:colors.navy,font:{name:font,size:10,bold:true,color:'#FFFFFF'},horizontalAlignment:'center',verticalAlignment:'center',wrapText:true};if(end>=4)sh.getRange(`A4:${lastCol}${end}`).format={font:{name:font,size:10,color:'#222222'},borders:{bottom:{style:'thin',color:colors.border}},verticalAlignment:'center'};sh.freezePanes.freezeRows(3);sh.freezePanes.freezeColumns(3);}
function statusCf(sh,range){const cf=sh.getRange(range).conditionalFormats;cf.add('containsText',{text:'VALID',format:{fill:colors.green,font:{color:'#006100'}}});cf.add('containsText',{text:'REVIEW',format:{fill:colors.yellow,font:{color:'#9C6500',bold:true}}});cf.add('containsText',{text:'OUTLIER',format:{fill:colors.red,font:{color:'#C00000',bold:true}}});cf.add('containsText',{text:'INVALID',format:{fill:'#F2F2F2',font:{color:colors.gray}}});}

const detailNames=[];const detailHeaders=['Rank','Name','Club','Age','Height','Previous Weight','Current Weight','Weight Change','Previous Fat %','Current Fat %','Fat Change','Previous Muscle %','Current Muscle %','Muscle Change','Priority','Final Status','Reason'];
for(const period of periods)for(const category of categories){const name=`${period.code}-${category.label}`.slice(0,31);detailNames.push(name);const sh=wb.worksheets.add(name);const rows=records.filter(r=>r.period===period&&r.category===category).sort(comparator);const data=rows.map(r=>[r.rank??null,r.p.name,r.p.club,r.p.age??'NA',r.p.height??'NA',r.prev.weight,r.curr.weight,r.change.weight,r.prev.fat,r.curr.fat,r.change.fat,r.prev.muscle,r.curr.muscle,r.change.muscle,r.priority,r.status,r.reason]);sh.getRange('A2:Q2').values=[[`${period.label}. Change = Current − Previous. Stable means exactly 0. Only VALID records receive automatic ranks.`,...Array(16).fill('')]];sh.getRange('A3:Q3').values=[detailHeaders];sh.getRangeByIndexes(3,0,data.length,17).values=data;base(sh,`${period.code} ${category.label} ranking`,'Q',3+data.length);sh.getRange('A:A').format.columnWidth=8;sh.getRange('B:C').format.columnWidth=24;sh.getRange('D:E').format.columnWidth=10;sh.getRange('F:O').format.columnWidth=14;sh.getRange('P:P').format.columnWidth=14;sh.getRange('Q:Q').format.columnWidth=58;sh.getRange(`F4:O${3+data.length}`).format.numberFormat='+0.0;-0.0;0.0';sh.getRange(`P4:Q${3+data.length}`).format.wrapText=true;statusCf(sh,`P4:P${3+data.length}`);}

const reportTitle=process.env.BTC_REPORT_TITLE||'BTC rankings under complete rules';const dashboard=wb.worksheets.add('Dashboard');dashboard.showGridLines=false;dashboard.getRange('A1').values=[[reportTitle]];dashboard.getRange('A2').values=[['All rankings use signed Current − Previous changes. Weekly outliers, REVIEW, and INVALID records are excluded from automatic Top rankings.']];dashboard.getRange('A1:Z1').format.font={name:font,size:14,bold:true,color:colors.navy};dashboard.getRange('A2:Z2').format.font={name:font,size:10,italic:true,color:colors.gray};const dh=['Rank','Name','Club','Age','Height','Previous','Current','Signed Change','Priority'];
function dashTable(row,col,title,period,category,count){dashboard.getRangeByIndexes(row-1,col-1,1,9).values=[[title,...Array(8).fill('')]];dashboard.getRangeByIndexes(row-1,col-1,1,9).format={fill:colors.blue,font:{name:font,size:11,bold:true,color:'#FFFFFF'}};dashboard.getRangeByIndexes(row,col-1,1,9).values=[dh];dashboard.getRangeByIndexes(row,col-1,1,9).format={fill:colors.navy,font:{name:font,size:10,bold:true,color:'#FFFFFF'},horizontalAlignment:'center',wrapText:true};const rows=records.filter(r=>r.period.code===period&&r.category.id===category&&r.status==='VALID'&&r.rank<=count).sort(comparator);const data=rows.map(r=>{const metric=category;return[r.rank,r.p.name,r.p.club,r.p.age??'NA',r.p.height??'NA',r.prev[metric],r.curr[metric],r.change[metric],r.priority];});if(data.length)dashboard.getRangeByIndexes(row+1,col-1,data.length,9).values=data;dashboard.getRangeByIndexes(row+1,col+4,Math.max(1,data.length),3).format.numberFormat='+0.0;-0.0;0.0';return Math.max(count,data.length);}
let dr=4;dashTable(dr,1,'Overall Weight Loss — Top 5','Overall','weight',5);dashTable(dr,11,'Overall Fat Loss — Top 3','Overall','fat',3);dashTable(dr,21,'Overall Muscle Gain — Top 3','Overall','muscle',3);dr+=8;for(const period of ['W1','W2','W3']){dashboard.getRangeByIndexes(dr-1,0,1,29).values=[[`${period} weekly rankings`,...Array(28).fill('')]];dashboard.getRangeByIndexes(dr-1,0,1,29).format={fill:colors.light,font:{name:font,size:11,bold:true,color:colors.navy}};dashTable(dr+1,1,'Weight Loss — Top 3',period,'weight',3);dashTable(dr+1,11,'Fat Loss — Top 3',period,'fat',3);dashTable(dr+1,21,'Muscle Gain — Top 3',period,'muscle',3);dr+=7;}for(const start of [1,11,21]){const widths=[7,22,22,8,9,13,13,13,9];for(let i=0;i<9;i++){let n=start+i,s='';while(n){n--;s=String.fromCharCode(65+n%26)+s;n=Math.floor(n/26);}dashboard.getRange(`${s}:${s}`).format.columnWidth=widths[i];}}

const queue=wb.worksheets.add('Review Queue');const qh=['Period','Category','Name','Club','Weight Change','Fat Change','Muscle Change','Status','Reason'];const flagged=records.filter(r=>r.status==='REVIEW'||r.status==='OUTLIER').sort((a,b)=>a.period.code.localeCompare(b.period.code)||a.category.label.localeCompare(b.category.label)||a.p.name.localeCompare(b.p.name));const qr=flagged.map(r=>[r.period.label,r.category.label,r.p.name,r.p.club,r.change.weight,r.change.fat,r.change.muscle,r.status,r.reason]);queue.getRange('A2:I2').values=[['Manual verification queue. Records remain visible but are not automatically ranked.',...Array(8).fill('')]];queue.getRange('A3:I3').values=[qh];if(qr.length)queue.getRangeByIndexes(3,0,qr.length,9).values=qr;base(queue,'REVIEW and weekly OUTLIER records','I',3+qr.length);queue.getRange('A:D').format.columnWidth=24;queue.getRange('E:G').format.columnWidth=14;queue.getRange('H:H').format.columnWidth=14;queue.getRange('I:I').format.columnWidth=62;queue.getRange(`E4:G${3+qr.length}`).format.numberFormat='+0.0;-0.0;0.0';queue.getRange(`H4:I${3+qr.length}`).format.wrapText=true;statusCf(queue,`H4:H${3+qr.length}`);

const status=wb.worksheets.add('Status Summary');const sr=[];for(const period of periods)for(const category of categories)for(const st of ['VALID','REVIEW','OUTLIER','INVALID'])sr.push([period.label,category.label,st,records.filter(r=>r.period===period&&r.category===category&&r.status===st).length]);status.getRange('A3:D3').values=[['Period','Category','Status','Count']];status.getRangeByIndexes(3,0,sr.length,4).values=sr;base(status,'Status counts by report and category','D',3+sr.length);status.getRange('A:C').format.columnWidth=28;status.getRange('D:D').format.columnWidth=12;statusCf(status,`C4:C${3+sr.length}`);

const sourceData=wb.worksheets.add('Source Data');const sh=['Source Workbook','Source Sheet','Club','Name','Age','Height','Baseline Weight','Baseline Fat','Baseline Muscle','W1 Weight','W1 Fat','W1 Muscle','W2 Weight','W2 Fat','W2 Muscle','W3 Weight','W3 Fat','W3 Muscle','Final Weight','Final Fat','Final Muscle'];const sourceRows=people.map(p=>[p.source,p.sourceSheet,p.club,p.name,p.age,p.height,...[0,1,2,3,4].flatMap(i=>[p.weight[i],p.fat[i],p.muscle[i]])]);sourceData.getRange('A3:U3').values=[sh];sourceData.getRangeByIndexes(3,0,sourceRows.length,21).values=sourceRows;base(sourceData,'v9 source data used for v11 rules','U',3+sourceRows.length);sourceData.getRange('A:D').format.columnWidth=24;sourceData.getRange('E:U').format.columnWidth=13;sourceData.getRange(`E4:U${3+sourceRows.length}`).format.numberFormat='0.0';

const order=['Dashboard','Status Summary','Review Queue',...detailNames,'Source Data'];for(let i=order.length-1;i>=0;i--)wb.worksheets.getItem(order[i]).position=0;wb.recalculate();console.log((await wb.inspect({kind:'table',range:'Dashboard!A1:AC35',include:'values,formulas',tableMaxRows:35,tableMaxCols:29})).ndjson);console.log((await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:200},summary:'v11 formula error scan'})).ndjson);await fs.mkdir(outputDir,{recursive:true});const out=await SpreadsheetFile.exportXlsx(wb);await out.save(outputPath);const previewDir=path.join(outputDir,'v11-previews');await fs.mkdir(previewDir,{recursive:true});for(const name of ['Dashboard','Status Summary','Review Queue','W1-Weight Loss','Overall-Weight Loss']){const img=await wb.render({sheetName:name,autoCrop:'all',scale:.8,format:'png'});await fs.writeFile(path.join(previewDir,`${name}.png`),new Uint8Array(await img.arrayBuffer()));}console.log(JSON.stringify({outputPath,participants:people.length,sheets:wb.worksheets.items.length,reviewRows:flagged.length,duplicates:duplicateKeys.size,statusCounts:Object.fromEntries(['VALID','REVIEW','OUTLIER','INVALID'].map(st=>[st,records.filter(r=>r.status===st).length]))}));

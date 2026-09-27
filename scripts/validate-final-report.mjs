import {FileBlob,SpreadsheetFile} from '@oai/artifact-tool';

const [reportPath]=process.argv.slice(2);
if(!reportPath)throw new Error('Usage: node scripts/validate-final-report.mjs <report.xlsx>');
const wb=await SpreadsheetFile.importXlsx(await FileBlob.load(reportPath));
const expected=['Dashboard','Status Summary','Review Queue','W1-Weight Loss','W1-Fat Loss','W1-Muscle Gain','W2-Weight Loss','W2-Fat Loss','W2-Muscle Gain','W3-Weight Loss','W3-Fat Loss','W3-Muscle Gain','Overall-Weight Loss','Overall-Fat Loss','Overall-Muscle Gain','Source Data'];
const names=wb.worksheets.items.map(s=>s.name);
const checks=[['required sheet set',expected.every(n=>names.includes(n))&&names.length===expected.length]];
const details=expected.filter(n=>/^(W[123]|Overall)-/.test(n));
let expectedPopulation=null;
for(const name of details){
  const rows=wb.worksheets.getItem(name).getUsedRange().values.slice(3);
  if(expectedPopulation===null)expectedPopulation=rows.length;
  checks.push([`${name}: complete population`,rows.length===expectedPopulation]);
  checks.push([`${name}: only VALID ranked`,rows.every(r=>(r[0]!==null&&r[0]!=='')===(r[15]==='VALID'))]);
  const firstNonValid=rows.findIndex(r=>r[15]!=='VALID');
  checks.push([`${name}: valid block first`,firstNonValid<0||rows.slice(firstNonValid).every(r=>r[15]!=='VALID')]);
  if(name.startsWith('W'))checks.push([`${name}: weekly limits`,rows.filter(r=>r[15]==='VALID').every(r=>Math.abs(r[7])<=4&&Math.abs(r[10])<=3&&Math.abs(r[13])<=3)]);
}
const errors=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:300},summary:'formula error scan'});
checks.push(['no formula errors',!errors.ndjson.includes('"match"')]);
const failed=checks.filter(([,ok])=>!ok);
console.log(JSON.stringify({sheetCount:names.length,participantRows:expectedPopulation,checks:checks.length,failed},null,2));
if(failed.length)process.exitCode=1;

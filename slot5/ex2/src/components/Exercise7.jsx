export default function Exercise7() {
  const companies = [
    { name: "Company One",   category: "Finance",    start: 1981, end: 2004 },
    { name: "Company Two",   category: "Retail",     start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto",       start: 1999, end: 2007 },
    { name: "Company Four",  category: "Retail",     start: 1989, end: 2010 },
    { name: "Company Five",  category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six",   category: "Finance",    start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto",       start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine",  category: "Retail",     start: 1981, end: 1989 },
  ];

  const company0New = { ...companies[0], start: companies[0].start + 1 };
  const concatAll = (...arrays) => arrays.reduce((acc, arr) => acc.concat(arr), []);
  const concatResult = concatAll([1, 2], [3], [4, 5]);

  return (
    <div>
      <h2>Exercise7</h2>
      <p>companies[0]: {companies[0].name} — start: {companies[0].start}, end: {companies[0].end}</p>
      <p>company0New : {company0New.name} — start: {company0New.start}, end: {company0New.end}</p>
      <p>concatAll([1,2], [3], [4,5]) = {JSON.stringify(concatResult)}</p>
    </div>
  );
}

export default function Exercise1() {

    // tinh ham double
    const hamDouble = (x) => x * 2;
    //ham kiem tra so chan
    const hamKiemTraSoChan = (x) => x % 2 === 0;
  return (
    <div>
      <h2>exercise1</h2>
      <p>Kết quả hamDouble(5): {hamDouble(5)}</p>
      <p>Kết quả hamKiemTraSoChan(4): {hamKiemTraSoChan(5).toString()? "Số chẵn" : "Số le"}</p>
    </div>
  );
}

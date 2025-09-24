function Exercise2() {
    //1.Tạo 1 mảng số nguyên, in ra danh sách list
    const numbers = [1, 12, -3, 4, 15, 20, -10, 8, 7, 6];
    //2.Tính tổng các phần tử trong mảng
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    //3.Tính giá trị Trung bình các phần tử trong mảng
    const average = sum / numbers.length;
    //4.Khai mảng chuỗi names, in ra danh sách các tên, theo thứ tự tăng dần alphabet
    const names = ["An", "Bình", "Cường", "Dũng", "Hà", "Hùng", "Lan", "Minh", "Nam", "Phương"];
    names.sort();
    //5.Khai báo 1 mảng students, chứa 10 đối tượng students
    const students = [
      { id: 1, name: "An", age: 20, grade: 8.5 },
      { id: 2, name: "Bình", age: 22, grade: 7.0 },
      { id: 3, name: "Cường", age: 21, grade: 9.0 },
      { id: 4, name: "Dũng", age: 19, grade: 6.5 },
      { id: 5, name: "Hà", age: 20, grade: 8.0 },
      { id: 6, name: "Hùng", age: 21, grade: 7.5 },
      { id: 7, name: "Lan", age: 22, grade: 9.0 },
      { id: 8, name: "Minh", age: 20, grade: 8.0 },
      { id: 9, name: "Nam", age: 19, grade: 7.0 },
      { id: 10, name: "Phương", age: 21, grade: 9.0 },
      ];
    //in ra danh sách students có grade >= 7.5, sắp xếp theo grade giảm dần
    const topStudents = students
      .filter((student) => student.grade >= 7.5)
      .sort((a, b) => b.grade - a.grade);
    return (
      <div>
        <h2>exercise2</h2>
        <p>In mảng số nguyên</p>
        <ul>
          {numbers.map((number, index) => (
            <li key={index}> phần tử thứ {index} - {number}</li>
          ))}
        </ul>
        <p>Tổng các phần tử trong mảng: {sum}</p>
        <p>Giá trị Trung bình các phần tử trong mảng: {average.toFixed(2)}</p>
        <p>Danh sách tên theo thứ tự tăng dần alphabet:</p>
        <ul>
          {names.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
        <p>Hiển thị danh sách topStudents dưới dạng bảng</p>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {topStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Danh sách students có grade &gt;= 7.5, sắp xếp theo grade giảm dần:</p>
        <ul>
          {topStudents.map((student) => (
            <li key={student.id}>
              Name: {student.name}, Age: {student.age}, Grade: {student.grade}
            </li>
          ))}
        </ul>
      </div>
    );
  }
export default Exercise2;
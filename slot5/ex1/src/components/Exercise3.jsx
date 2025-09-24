export default function Exercise3() {
    const person = {
        name :"Costa",
        address: {
            street: "Lalaland 12",
        }
    };

    const {
        address: { street, city = "Unknown City" }
    } = person;

    const ages2 = [33, 12, 20, 16]; 
    const [first, , third = 0, ...restAges] = ages2;

    return (
        <div>
            <h2>exercise3</h2>
            <p>Bài 3 </p>
            <p> Thành phố đó là {city}</p>
            <p>Địa chỉ đường: {street}</p>
            <p>Tuổi đầu tiên: {first}</p>
            <p>Tuổi thứ ba: {third}</p>
            <p>Các tuổi còn lại: {restAges}</p>
        </div>
    );
}
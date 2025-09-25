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

    return (
        <div>
            <h2>exercise3</h2>
            <p>Bài 3 </p>
            <p> Thành phố đó là {city}</p>
            <p>Địa chỉ đường: {street}</p>
        </div>
    );
}
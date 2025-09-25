export default function Exercise4() {
    const ages2 = [33, 12, 20, 16]; 
    const [first, , third = 0, ...restAges] = ages2;

    return (
        <div>
            <h2>exercise4</h2>
            <p>Tuoi dau tien: {first}</p>
            <p>Tuoi thu ba: {third}</p>
            <p>Cac tuoi con lai: {restAges}</p>
        </div>
    );
}
function openModal() { document.querySelector(".modal").style.display = "flex" };
function closeModal() { document.querySelector(".modal").style.display = "none" };

document.addEventListener("keydown", function(event) {
    if (event.key === "u") document.getElementById("upload").click();
    if (event.key === "s") openModal();
    if (event.key === "Escape") closeModal(); 
});

const content = document.querySelector(".content");
const img = document.querySelector(".img");
const upload = document.getElementById("upload");

let x = 0;
let y = 0;

let vx = 2;
let vy = 2;

let lastTime = performance.now();

upload.addEventListener("change", () => {
    const file = upload.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    img.src = url;
});

img.onload = () => {
    x = 0;
    y = 0;
};

function animate(time) {
    const delta = (time - lastTime) / 16.67;
    lastTime = time;

    x += vx * delta;
    y += vy * delta;

    if (x <= 0) {x = 0; vx = Math.abs(vx)};
    if (x + img.offsetWidth >= content.clientWidth) {x = content.clientWidth - img.offsetWidth; vx = -Math.abs(vx)};

    if (y <= 0) {y = 0; vy = Math.abs(vy)};
    if (y + img.offsetHeight >= content.clientHeight) {y = content.clientHeight - img.offsetHeight; vy = -Math.abs(vy)};

    img.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
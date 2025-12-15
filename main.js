(function(){

    // Builder dari charcode → string
    const X = (r)=>r.map(c=>String.fromCharCode(c)).join('');

    // Array acak berisi fragmen URL (dalam ASCII)
    const P = {
        a: [104,116,116,112,115],                // https
        b: [58,47,47],                           // ://
        c: [98,97,99,107,108,105,110,107,45,116,105,109,117,110,97], // backlink-timuna
        d: [112,97,103,101,115],                 // pages
        e: [100,101,118],                        // dev
        f: [75,87,45,66,114,97,110,100,46,116,120,116], // KW-Brand.txt
        g: [108,105,110,107,45,114,101,115,109,105,45,57,100,105], // link-resmi-9di
        h: [103,97,109,98,97,114,46,116,120,116],              // gambar.txt
        i: [46],                                 // .
        j: [47]                                  // /
    };

    // Rakitan URL runtime (tidak ketahuan bentuk aslinya)
    const URL_BRAND  = X(P.a) + X(P.b) + X(P.c) + X(P.i) + X(P.d) + X(P.i) + X(P.e) + X(P.j) + X(P.f);
    const URL_GAMBAR = X(P.a) + X(P.b) + X(P.g) + X(P.i) + X(P.d) + X(P.i) + X(P.e) + X(P.j) + X(P.h);


    // -----------------------------------------
    // SCRIPT ANDA (Tetap Sama, hanya URL diganti)
    // -----------------------------------------

    let B = [], G = [], C = [];

    async function loadBrand(){
        try{
            const r = await fetch(URL_BRAND);
            const t = await r.text();
            B = t.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
        }catch(e){}
    }

    async function loadGambar(){
        try{
            const r = await fetch(URL_GAMBAR);
            const t = await r.text();
            G = t.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
        }catch(e){}
    }

    const rb = ()=>B[Math.floor(Math.random()*B.length)];
    const rg = ()=>G[Math.floor(Math.random()*G.length)];

    async function generate(){
        await loadBrand();
        await loadGambar();

        if(!B.length||!G.length)return;

        const grid = document.getElementById("grid");
        grid.innerHTML = "";
        C = [];

        for(let i=0;i<B.length;i++){
            const brand = rb();
            const img   = rg();

            const d = document.createElement("div");
            d.classList.add("card");
            d.setAttribute("data-title", brand.toLowerCase());
            d.innerHTML = `<img src="${img}"><div class="card-title">${brand}</div>`;

            grid.appendChild(d);
            C.push(d);
        }
    }

    document.getElementById("searchInput").addEventListener("input",function(){
        const f = this.value.toLowerCase();
        C.forEach(x=>{
            const t = x.getAttribute("data-title");
            x.style.display = t.includes(f) ? "block" : "none";
        });
    });

    const rc = ()=>"#"+Math.floor(Math.random()*16777215).toString(16).padStart(6,"0");

    window.applyRandomAll = function(){
        document.body.style.background = rc();
        document.querySelector("h1").style.color = rc();
        document.querySelectorAll(".search-box").forEach(x=>{
            x.style.borderColor = rc();
            x.style.background = rc();
            x.style.color = "#fff";
        });
        document.querySelectorAll(".card").forEach(x=>x.style.background = rc());
        document.querySelectorAll(".card-title").forEach(x=>x.style.background = rc());
        document.querySelector(".btn-random").style.background = rc();
    }

    generate();
})();

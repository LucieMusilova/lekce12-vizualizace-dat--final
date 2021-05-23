let zakladniInfo = null;

fetch('https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/zakladni-prehled.min.json')
    .then(response => response.json())
    .then(data => {
        // preulozeni dat do globalni promenne a vypsani do konzole
        zakladniInfo = data;
        console.log(zakladniInfo);

        // pridani data upravy
        let datumUpravy = new Date(zakladniInfo.modified);
        document.getElementById('js-modifikovano').innerText = datumUpravy.toLocaleDateString('cs-CZ') + ', ' + datumUpravy.toLocaleTimeString('cs-CZ', {hour: '2-digit', minute: '2-digit'});
        
        // zdroj dat
        document.getElementById('js-zdroj').innerText = zakladniInfo.source;
        document.getElementById('js-zdroj').href = zakladniInfo.source;

        // aktualne hospitalizovani
        document.getElementById('js-hospitalizovani').innerText = parseInt(zakladniInfo.data[0].aktualne_hospitalizovani).toLocaleString('cs-CZ');
        
        // pribytek za predchozi mereny den
        document.getElementById('js-potvrzeni').innerText = parseInt(zakladniInfo.data[0].potvrzene_pripady_vcerejsi_den).toLocaleString('cs-CZ');
        let datumPotvrzenych = new Date(zakladniInfo.data[0].potvrzene_pripady_vcerejsi_den_datum);
        document.getElementById('js-potvrzeni-datum').innerText = datumPotvrzenych.toLocaleDateString('cs-CZ');

        // ockovanych za predchozi mereny den
        document.getElementById('js-ockovani').innerText = parseInt(zakladniInfo.data[0].ockovane_osoby_vcerejsi_den).toLocaleString('cs-CZ');
        let datumOckovanych = new Date(zakladniInfo.data[0].ockovane_osoby_vcerejsi_den_datum);
        document.getElementById('js-ockovani-datum').innerText = datumOckovanych.toLocaleDateString('cs-CZ');

        // UKOL NA CVICENI
        // pridej do prehledu podil pribytku nakazenych ve vekove 
        // skupine 65+ za posledni mereny den z celkoveho pribytku
        // nakazenych za posledni mereny den

        // UKOL NA CVICENI
        // proved validaci, zda plati podminka 
        // celkem_potvrzeni = aktivni + vyleceni + umrti
        // vysledek validace vypis do konzole pomoci console.log()
    })
    .catch((error) => {
        console.error('Chyba aplikace: ', error);
    });
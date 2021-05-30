fetch('https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/hospitalizace.min.json')
    .then(response => response.json())
    .then(data => {
        dataHosp = [
          ['Celkový počet hospitlizovaných']
        ];

        data.data.forEach(zaznam => {
          dataHosp[0].push(zaznam.pacient_prvni_zaznam);
        });

        console.log(dataHosp);

        var graf = c3.generate({
          bindto: '#js-pocet-hosptalizovanych',
          data: {
            columns: dataHosp
          }
      });
    })
    .catch((error) => {
        console.error('Chyba aplikace: ', error);
    });
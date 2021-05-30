fetch('https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/hospitalizace.min.json')
    .then(response => response.json())
    .then(data => {
        dataHosp = [
          ['x'],
          ['Celkový počet hospitlizovaných']
        ];

        data.data.forEach(zaznam => {
          dataHosp[0].push(zaznam.datum);
          dataHosp[1].push(zaznam.pacient_prvni_zaznam);
        });

        console.log(dataHosp);

        var graf = c3.generate({
          bindto: '#js-pocet-hosptalizovanych',
          data: {
            x: 'x',
            columns: dataHosp
          },
          axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%d.%m.%Y'
                }
            }
        }
      });
    })
    .catch((error) => {
        console.error('Chyba aplikace: ', error);
    });
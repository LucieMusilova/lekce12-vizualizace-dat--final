fetch('https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/hospitalizace.min.json')
    .then(response => response.json())
    .then(data => {
        dataHosp = [
          ['x'],
          ['Celkový počet hospitlizovaných']
        ];

        dataHospDalsi = [
          ['Stav bez příznaků nebo lehký'],
          ['Stav střední nebo těžký']
        ];

        data.data.forEach(zaznam => {
          dataHosp[0].push(zaznam.datum);
          dataHosp[1].push(zaznam.pocet_hosp);
          dataHospDalsi[0].push(zaznam.stav_bez_priznaku + zaznam.stav_lehky);
          dataHospDalsi[1].push(zaznam.stav_stredni + zaznam.stav_tezky);
        });

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

      setTimeout(function () {
        graf.load({
            columns: dataHospDalsi
        });
    }, 2000);
    })
    .catch((error) => {
        console.error('Chyba aplikace: ', error);
    });
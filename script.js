/* Postal Code Search */

$('#search-button').on('click', function() {
    let i_provinceName = document.getElementById('search-province').value.toUpperCase()
    let i_cityName = document.getElementById('search-city').value.toUpperCase()
    let i_district = document.getElementById('search-district').value.toUpperCase()
    let i_subdistrict = document.getElementById('search-subdistrict').value.toUpperCase()

    $.ajax({
        url: 'data/postal_code.json',
        success: result => {
            let searchResult = '';
            let provinceFound = false;
            let cityFound = false;
            let districtFound = false;
            let subdistrictFound = false;

            const {province, postal} = result

            Object.values(province).forEach(p => {
                if(p.province_name === i_provinceName) {
                    provinceFound = true;

                    let o_province = postal[p.province_code]
                    
                    let i = 0;
                    for(i; i < o_province.length; i++) {
                        if(o_province[i].city === i_cityName) {
                            cityFound = true;
                            
                            if(o_province[i].urban === i_district) {
                                districtFound = true;

                                if(o_province[i].sub_district === i_subdistrict) {
                                    subdistrictFound = true;
                                    break;
                                }
                            }
                        }
                    }

                    if(provinceFound && cityFound && districtFound && subdistrictFound) {
                        searchResult += `
                            <div class="data-container">
                                <div class="data-upper">
                                    <h3 class="data-kelurahan">${o_province[i].sub_district}</h3>
                                    <h3 class="data-kodepos info-radius">${o_province[i].postal_code}</h3>
                                </div>
                                <div class="data-inner">
                                    <p>Kota: ${o_province[i].city}</p>
                                    <p>Kecamatan: ${o_province[i].urban}</p>
                                </div>
                                <div class="data-lower">
                                    <h4 class="data-provinsi info-radius">${i_provinceName}</h4>
                                </div>
                            </div>
                            `;

                            $('#result-container').html(searchResult);

                            return;
                    }
                }
            });

            if(!provinceFound || !cityFound || !districtFound || !subdistrictFound) {
                searchResult += `
                    <div class="data-container not-found">Maaf, data yang dimasukkan tidak valid</div>
                `
            }

            $('#result-container').html(searchResult)
        },
        error: () => console.log('Error')
    })
})

/* ===== Postal Code Search ===== */

/* Randomize Background  */
function randomizeBackground() {
    document.getElementById('body').style.backgroundImage = `url('data/img/bg-${Math.floor(Math.random() * 10)}.jpg')`;
}

randomizeBackground()
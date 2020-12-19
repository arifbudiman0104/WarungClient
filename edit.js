function findbyid() {
    let url = "http://localhost:8080/Warung/webresources/dagangan.dagangan";
    let view = document.getElementById('dagangan');
    let idobj = document.getElementById('inputid');
    let idn = idobj.elements[0].value;
    let nurl = url + '/' + idn;
    $.ajax({
        url: nurl,
        method: 'GET',
        dataType: 'xml',
        success: function (resp) {
            if (resp != null) {
                let id = resp.getElementsByTagName("id")[0].childNodes[0].nodeValue;
                let namadagangan = resp.getElementsByTagName("namadagangan")[0].childNodes[0].nodeValue;
                let harga = resp.getElementsByTagName("harga")[0].childNodes[0].nodeValue;
                let jumlah = resp.getElementsByTagName("jumlah")[0].childNodes[0].nodeValue;
                view.innerHTML = 'ID ' + id + ' <br> ' + 'Nama Dagangan ' + namadagangan + ' <br> ' + 'Harga Rp.' + harga + ' <br> ' + 'Jumlah ' + jumlah;
            }
            else { view.innerHTML = 'tidak ada data'; }
        },
        fail: function (e) { }
    })
}

function deletebyid() {
    let url = "http://localhost:8080/Warung/webresources/dagangan.dagangan";
    let view = document.getElementById('delete');
    let idobj = document.getElementById('inputid');
    let idn = idobj.elements[0].value;
    let nurl = url + '/' + idn;
    $.ajax({
        url: nurl,
        method: 'DELETE',
        dataType: 'xml',
        success: function (resp) {
            view.innerHTML = idn + ' deleted';
        },
        fail: function (e) {
            view.innerHTML = 'failed';
        }
    })

}

function showalldata() {
    let urls = "http://localhost:8080/Warung/webresources/dagangan.dagangan";
    let view = document.getElementById('show');

    $.ajax({
        url: urls,
        method: 'GET',
        success: function (xml) {
            console.log(xml);
            let table = xml2html(xml);
            view.innerHTML = table;
        },
        fail: function (e) { alert('error'); }
    })
    //view.innerHTML = "Show here";
}

function xml2html(xml) {
    let sdata = xml.getElementsByTagName('dagangan').length;
    let table = "<table border='1'>";
    table += '<tr> <th>ID</th> <th>NAMA DAGANGAN</th> <th>HARGA</th> <th>JUMLAH</th> </tr>'
    for (row = 0; row < sdata; row++) {
        let id = xml.getElementsByTagName("id")[row].childNodes[0].nodeValue;
        let namadangan = xml.getElementsByTagName("namadagangan")[row].childNodes[0].nodeValue;
        let harga = xml.getElementsByTagName("harga")[row].childNodes[0].nodeValue;
        let jumlah = xml.getElementsByTagName("jumlah")[row].childNodes[0].nodeValue;
        table += '<tr> <td>' + id + '</td> <td>' + namadangan + '</td> <td>' + harga + '</td> <td>' + jumlah + '</td> </tr>'
    }
    table += "</table>";
    return table;

}


//eror di create data
function createdata() {
    let url = "http://localhost:8080/Warung/webresources/dagangan.dagangan";
    let view = document.getElementById('dagangan');
    let idobj = document.getElementById('inputid');
    let id = idobj.elements[0].value;
    let namadagangan = idobj.elements[1].value;
    let jumlah = idobj.elements[3].value;
    let harga = idobj.elements[2].value;
    let passvar =
        '<dagangan>' +
        '<id>' + id + '</id>' +
        '<namadagangan>' + namadagangan + '</namadagangan>' +
        '<harga>' + harga + '</harga>' +
        '<jumlah>' + jumlah + '</jumlah>' +
        '</dagangan>';

    $.ajax({
        url: url,
        method: 'POST',
        contentType: 'application/xml',
        data: passvar,
        success: function (resp) {
            view.innerHTML = id + ' added';
        },
        fail: function (e) {
            view.innerHTML = 'added failed';
        }
    })
}

function findforupdate() {
    let id = document.getElementById('id').value;
    findforedit(id);
}

function findforedit(id) {
    let url = "http://localhost:8080/Warung/webresources/dagangan.dagangan";
    let nurl = url + '/' + id;
    $.ajax({
        url: nurl,
        method: 'GET',
        dataType: 'xml',
        success: function (resp) {
            if (resp != null) {
                let id = resp.getElementsByTagName("id")[0].childNodes[0].nodeValue;
                let namadagangan = resp.getElementsByTagName("namadagangan")[0].childNodes[0].nodeValue;
                let harga = resp.getElementsByTagName("harga")[0].childNodes[0].nodeValue;
                let jumlah = resp.getElementsByTagName("jumlah")[0].childNodes[0].nodeValue;
                document.getElementById("nid").value = id;
                document.getElementById("nnamadagangan").value = namadagangan;
                document.getElementById("nharga").value = harga;
                document.getElementById("njumlah").value = jumlah;
            }
            else { view.innerHTML = 'tidak ada data'; }
        },
        fail: function (e) { }
    })
}
function updatedata() {
    let url = "http://localhost:8080/Warung/webresources/dagangan.dagangan/";
    let view = document.getElementById('data');
    let idobj = document.getElementById('inputid');
    let id = idobj.elements[0].value;
    let namadagangan = idobj.elements[1].value;
    let harga = idobj.elements[2].value;
    let jumlah = idobj.elements[3].value;
    let passvar =
        '<dagangan>' +
        '<id>' + id + '</id>' +
        '<namadagangan>' + namadagangan + '</namadagangan>' +
        '<harga>' + harga + '</harga>' +
        '<jumlah>' + jumlah + '</jumlah>' +
        '</dagangan>';

    url += id;
    $.ajax({
        url: url,
        method: 'PUT',
        contentType: 'application/xml',
        data: passvar,
        success: function (resp) {
            view.innerHTML = 'id: ' + id + ' updated';
        },
        fail: function (e) {
            view.innerHTML = 'update failed';
        }
    })

}
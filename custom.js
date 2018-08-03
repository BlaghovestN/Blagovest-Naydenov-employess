var data = function () {
        var jsonTemp = null;
        $.ajax({
            'async': false,
            'url': "json.json",
            'success': function (data) {
                jsonTemp = data;
            }
        });
        return jsonTemp;
    }();

    var jsonObject;
    var uniqueNames = [];
    var compare;

    function leadArray() {
        var dateTo;
        var dateFrom
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }
        today = yyyy + '-' + mm + '-' + dd;


        jsonObject = data;
        jsonObject.map(function (days) {
            if (days.DateТо == null) {
                return days.DateТо = today;
            }
        });

        for (i = 0; i < jsonObject.length; i++) {


            if (!(uniqueNames.indexOf(jsonObject[i].ProjectID) > -1)) {
                uniqueNames.push(jsonObject[i].ProjectID); //add prodjectID list
            }
        }

        jsonObject = jsonObject.sort(function (a, b) {
            var dataA = (Math.floor(new Date(a.DateТо).getTime() / (3600 * 24 * 1000)) - Math.floor(new Date(a.DateFrom).getTime() / (3600 * 24 * 1000)))
            var dataB = (Math.floor(new Date(b.DateТо).getTime() / (3600 * 24 * 1000)) - Math.floor(new Date(b.DateFrom).getTime() / (3600 * 24 * 1000)))
            return dataB - dataA;
        });

        console.log(jsonObject);
    }

    function projectName() {

        for (i = 0; i < uniqueNames.length; i++) {
            var currentName = uniqueNames[i];
            var uniqueDataArray = $.grep(jsonObject, function (data) {
                return data.ProjectID == currentName;
            });

            var html = '<table><th>ProjectID</th>' +
                '<th>EmpID</th><th>DateFrom</th><th>DateTo</th><th>Day</th>';

            for (j = 0; j < uniqueDataArray.length; j++) {
                if(j == 2) {
                    break;
                }

                item = uniqueDataArray[j];
                var day = (Math.floor(new Date(uniqueDataArray[j].DateТо).getTime() / (3600 * 24 * 1000)) - Math.floor(new Date(uniqueDataArray[j].DateFrom).getTime() / (3600 * 24 * 1000)))

                html += '<tr><td>' + uniqueDataArray[j].ProjectID +
                    '</td><td>' + uniqueDataArray[j].EmpID + '</td><td>' +
                    uniqueDataArray[j].DateFrom + '</td><td>' + uniqueDataArray[j].DateТо + '</td><td>' + day + '</td></tr>';
            }
            html += '</table>';
            $('#proData').append(html);
        }
    }


    $(function () {

        leadArray();
        projectName()
    });

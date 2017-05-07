
module.exports.set = function(app,connection){
    /*  @api airsensor
*   @var int          | air_s_id      [record id]
*   @var date         | air_s_date    [current date]
*   @var int          | air_s_value   [air quality index slope value]
*/
app.get('/api/', function(req, res) {

  connection.query('SELECT * FROM nmct_table', function(err, rows, fields) {
    if (!err && rows.length > 0){
        res.json(rows);
        console.log(rows.length)
    }
    else if (err) {
      res.json('Failed to fetch rows from the table.');
    }else if (rows.length === 0){
        res.json({"No Values found": 0});
    }

  });
});


    app.get('/api/latest', function(req, res) {

        connection.query('SELECT * FROM NMCTData.nmct_table WHERE ID = (SELECT MAX(ID) FROM NMCTData.nmct_table)', function(err, rows, fields) {
            if (!err && rows.length > 0){
                res.json(rows);
                console.log(rows.length)
            }
            else if (err) {
                res.json('Failed to fetch rows from the table.');
            }else if (rows.length === 0){
                res.json({"No Values found": 0});
            }

        });
    });




/*
app.get('/api/airsensor/:date/:date2', function(req, res) {
  var date = req.params.date;
  var date2 = req.params.date2;
  connection.query('SELECT * FROM nmct_table WHERE Date BETWEEN "'+date+'" AND "'+date2+'"', function(err, rows, fields) {
    if (!err){
        res.json(rows);
    }
    else {
      res.json('Failed to fetch rows from the airsensor table.');
    }
  });
});

  */
};

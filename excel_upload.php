<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>excel upload</title>
</head>
<body>
    <form enctype="multipart/form-data" action="./excel_read.php" method="post">
        <table border="1">
        <tr>
            <th style="background-color:#DCDCDC">파일</th>
            <td><input type="file" name="excelFile"/></td>
        </tr>

        <tr>
            <th style="background-color:#DCDCDC">등록</th>
            <td style="text-align:center;"><input type="submit" value="업로드"/></td>
        </tr>
    </form>
</body>
</html>
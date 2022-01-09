<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>업로드한 파일을 읽음</title>
<!-- Bootstrap core CSS -->
    <link href="./css/bootstrap.min.css" rel="stylesheet">

    <link rel="stylesheet" href="./css/cm.css">


    <script src="./js/jquery-2.1.4.min.js"></script>
    <script src="./js/bootstrap.min.js"></script>
<!--    <script src="/js/jquery.canvasjs.min.js"></script>-->
    <script src="./js/jquery.query-object.js"></script>

    <script src="./js/cm.js"></script>
<!--    <script src="/js/app.js?v=1"></script>-->
<!--    <script src="/js/jsonstore.js"></script>-->
    <style>
        body {
            background-image: url("./img/body_bg4.png");
            background-size: 27px 46px;
            background-repeat: repeat;
            color: #231815;
        }
    </style>
</head>
<body>
    <div class="container">
    <style>
        #search_books_desc {
            width: 100%;
            height: 200px;
            line-height: 200px;
            text-align: center;
            font-size: 16px;
        }

        .col-xs-6{
            padding-left:0px !important;
            padding-right:0px !important;
        }

        .no-search-result {
            width: 100%;
            text-align: center;
        }

        .frame {
            margin-top: 15px;
            width: 100%;

            /*border-radius: 5px;*/
            /*border: 1px solid #cdcdcd;*/
        }

        .bottom-logo {
            width: 100%;
            position: fixed;
            left: 0px;
            bottom: 30px;
            text-align: center;
        }
        .bottom-logo img {
            height: 130px;
        }

        .bg-gray {
            background-color: #f0f0f0;
        }

        #book-list {
            margin-top: 30px;
            border: 1px solid #ffffff;
        }
        #book-list th {
            border-right: 1px solid #ffffff;
            background-color: #231815;
            color: white;
        }
        #book-list td {
            border-right: 1px solid #ffffff;
            border-top: 0px;
        }

        #book-list tr:nth-child(odd) {
            background-color: #efefef;
        }
        #book-list tr:nth-child(even) {
            background-color: #e6e6e6;
        }
    </style>
    <script>
    $(document).ready(function () {
        var q = $.query.get('q');
        if(q != true) {
            $("#keyword").val(q);
        }

	var s = $.query.get('s');
	if(String(s) != "true") {	
	    $("#shelfno").val(s);
	}

	var g = $.query.get('g');
	if(String(g) != "true") {
	    $("#genre").val(g);
	}

        $("#keyword").keydown(function (event) {
            if(event.which == 13) {
                onSearch();
            }
        });

        if($(".frame").length > 0) {
            console.log($(window).height());
            var frameHeight = $(document).height() - $(".frame")[0].offsetTop - 15;
            console.log(frameHeight);
            $(".frame").css("height", frameHeight + "px");
        }
    });

    function onSearch() {
        var q = $("#keyword").val();
	var g = $("#genre").val();
	var s = $("#shelfno").val();

        if(q == "" && g == "" && s == "") {
            myAlert("도서명을 입력하거나 장르/책장을 선택 해 주세요!!");
            return;
        }
	var g = $("#genre").val();
	var s = $("#shelfno").val();

	if(g == null) g = "";
	if(s == null) s = ""
	//alert(g);
	//alert(s);

        window.location = $.query.set('q', q).set('g', g).set('s', s);
    }
</script>
    <div class="text-center mt20" style="padding: 20px;">
        <img src="./img/txt_search.png" style="width: 100px;">
    </div>

<!--search test-->
<script>
    function filter() {
        let search = document.getElementById("search").value.toLowerCase();
        let book_list = document.getElementsByClassName("book_list");
        
        for (let i = 0; i < book_list.length; i++) {
            book_name = book_list[i].getElementsByClassName("book_name");
            if (book_name[0].innerHTML.toLowerCase().indexOf(search) != -1) {
                book_list[i].style.display = "block";
                book_list[i].style.display = "";
            } else {
                book_list[i].style.display = "none";
            }
        }
    }
</script>
    <div class="searchBox">
        <input type="text" id="search" onkeyup="filter()" placeholder="도서명을 입력하세요.">
    </div>
<!--/search test-->

    <div class="input-group mt15">
        <div class="col-xs-6">
            <input id="keyword" type="text" class="form-control" placeholder="검색어를 입력하세요">
        </div>
        <!--
        <div class="col-xs-1" style="padding-right:0px;padding-left:20px" >
            <label class="" style="margin-top:8px;padding-right:0px" ><input type="checkbox" id="options" value="" style="padding-right:0px"/> 검색옵션</label>
        </div>
        -->
        <div class="col-xs-3" style="">
                <select id="genre" class="form-control" name="genre">
                    <option value="">전체장르</option>
            <option value="1">웹툰</option>
            <option value="2">마블 코믹스</option>
            <option value="3">코믹스</option>
            <option value="4">성인만화</option>
            <option value="5">순정</option>
            <option value="6">무협소설</option>
            <option value="7">판타지소설</option>
            <option value="8">아동도서</option>
            <option value="9">순정소설</option>
            <option value="10">추리만화</option>
            <option value="11">판타지무협</option>
            <option value="12">애장판</option>
            <option value="13">신간</option>
            <option value="14">잡지</option>
                </select>
        </div>
        <div class="col-xs-3" style="padding-left:0px">
            <select id="shelfno" class="form-control" name="shelfno">
                <option value="">전체책장</option>
                <option value="1">1</option>	
                <option value="2">2</option>	
                <option value="3">3</option>	
                <option value="4">4</option>	
                <option value="5">5</option>	
                <option value="6">6</option>	
                <option value="7">7</option>	
                <option value="8">8</option>	
                <option value="9">9</option>	
                <option value="10">10</option>
            </select>
        </div>
        <span class="input-group-btn">
            <button type="button" class="btn btn-secondary btn-search-book" style="padding: 3px 8px;" onclick="onSearch()"><img src="./img/ic_search.png" style="width: 26px;"></button>
        </span>
    </div>
<!--        excel reading-->
       <?php
        require_once "./PHPExcel-1.8/Classes/PHPExcel.php"; // PHPExcel.php을 불러와야 하며, 경로는 사용자의 설정에 맞게 수정해야 한다.
        $objPHPExcel = new PHPExcel();
        require_once "./PHPExcel-1.8/Classes/PHPExcel/IOFactory.php"; // IOFactory.php을 불러와야 하며, 경로는 사용자의 설정에 맞게 수정해야 한다.
        
        //$filename = './file.xlsx'; // 서버에 올려진 파일을 직접 지정할 경우
        
        // excel_upload.php 파일을 이용해 업로드 한 경우
        $filename = $_FILES['excelFile']['tmp_name'];

        try {
            // 업로드 된 엑셀 형식에 맞는 Reader객체를 만든다.
            $objReader = PHPExcel_IOFactory::createReaderForFile($filename);

            // 읽기전용으로 설정
            $objReader->setReadDataOnly(true);

            // 엑셀파일을 읽는다
            $objExcel = $objReader->load($filename);

            // 첫번째 시트를 선택
            $objExcel->setActiveSheetIndex(0);
            $objWorksheet = $objExcel->getActiveSheet();
            $rowIterator = $objWorksheet->getRowIterator();
            foreach ($rowIterator as $row) { // 모든 행에 대해서
                       $cellIterator = $row->getCellIterator();
                       $cellIterator->setIterateOnlyExistingCells(false);
                }
        ?>

                <table id="book-list" class="wd100 table">
                    <thead>
                        <tr>
                            <th>책장/칸</th>
                            <th>도서명</th>
                            <th>저자</th>
                            <th>최종권수</th>
                            <th>완결여부</th>
                            <th>장르</th>
                            <th>비고</th>
                        </tr>
                    </thead>
                    <tbody>

        <?php
            $maxRow = $objWorksheet->getHighestRow();


            for ($i = 2 ; $i <= $maxRow ; $i++) {
                $genre = $objWorksheet->getCell('A' . $i)->getValue(); // A열
                $name = $objWorksheet->getCell('B' . $i)->getValue(); // B열
                $contents = $objWorksheet->getCell('C' . $i)->getValue(); // C열
                $writer = $objWorksheet->getCell('D' . $i)->getValue(); // D열
                $volume = $objWorksheet->getCell('E' . $i)->getValue(); // E열
                $ending = $objWorksheet->getCell('F' . $i)->getValue(); // F열
                $shelfNo1 = $objWorksheet->getCell('G' . $i)->getValue(); // G열
                $shelfNo2 = $objWorksheet->getCell('H' . $i)->getValue(); // H열
                $etc = $objWorksheet->getCell('I' . $i)->getValue(); // I열
        ?>

                        <tr data-idx="<?php echo $i; ?>" class="book_list">
                            <td><?php echo $shelfNo1."-".$shelfNo2; ?></td>
                            <td class="book_name"><?php echo $name; ?></td>
                            <td><?php echo $writer; ?></td>
                            <td><?php echo $volume; ?></td>
                            <td><?php echo $ending; ?></td>
                            <td><?php echo $genre; ?></td>
                            <td><?php echo $etc; ?></td>
                        </tr>


    <?php
                }
    ?>        
                    </tbody>
                </table>
    <?php
        } catch (exception $e) {
            echo "엑셀 파일을 읽는 도중 오류가 발생 하였습니다.";
        }
    ?>
<!--        /excel reading-->
    </div>
    <!-- /container -->
    <style>
        .content-div {
            margin-top: 64px;
        }
        .container {
            margin-top: 64px;
        }
    </style>
    <div style="position: fixed; top: 0; left: 0; width: 100%; background-color: #231815">
        <div class="col-xs-8 col-xs-offset-2 text-center" style="padding-top: 13px; padding-bottom: 13px;">
    <!--        <h4 class="text-center" style="line-height: 32px; color: white;">--><!--</h4>-->
            <img src="./img/ic_logo.png" style="height: 37px;">
        </div>
        <div class="col-xs-2 text-right">
            <button type="button" id="btnRightAction" class="btn btn-default" style="margin-top: 10px; display: none;">추가</button>
        </div>
    </div>
    <div id="alertModal" class="modal" tabindex="-1" role="dialog" aria-labelledby="myAlertModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="alertTitle"></h4>
                </div>
                <div class="modal-body" id="alertMsg">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-orange" data-dismiss="modal" style="margin-top: 0px;">확인</button>
                </div>
            </div>
        </div>
    </div>
    <div id="confirmModal" class="modal" tabindex="-1" role="dialog" aria-labelledby="myConfirmModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="confirmTitle"></h4>
                </div>
                <div class="modal-body" id="confirmMsg">
                </div>
                <div class="modal-footer">
                    <button id="confirmModalOk" type="button" class="btn btn-orange" data-dismiss="modal" style="margin-top: 0px;">확인</button>
                    <button id="confirmModalCancel" type="button" class="btn btn-orange" data-dismiss="modal" style="margin-top: 0px;">취소</button>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
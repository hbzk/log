var db = window.openDatabase("Database", "1.0", "LogDB", 2 * 1024 * 1024);

$(function(){
	
});

function db_allDrop(){
	db.transaction(function(tx) {
		tx.executeSql('DROP TABLE IF EXISTS ACTION');
		tx.executeSql('DROP TABLE IF EXISTS USER');
		tx.executeSql('DROP TABLE IF EXISTS LOG');
		
		db_init();
	}, db_errorCB);
}

function db_init() {
	db.transaction(function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS USER (ID INTEGER PRIMARY KEY, USER_NO UNIQUE, EMAIL, GENDER, AGE, JOB, SALARY, SPEND, SCHOLAR, MARRY)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS LOG (ID INTEGER PRIMARY KEY, TITLE, CLASSNAME, START_TIME, END_TIME, DURATION)');
		tx.executeSql('CREATE TABLE IF NOT EXISTS ACTION (POSITION TEXT, ICON_NAME TEXT PRIMARY KEY, CLASS_NAME TEXT, TIMER_VAL INTEGER, BACK_COL TEXT)');
		tx.executeSql('INSERT OR IGNORE INTO ACTION '  
			+ ' SELECT 1 AS POSITION, "headphones" AS ICON_NAME, "fa fa-headphones" AS CLASS_NAME, 80 AS TIMER_VAL, "#DB435C" AS BACK_COL'
			+ ' UNION SELECT 0,"music", "fa fa-music", 60, "#74DBC5"'
			+ ' UNION SELECT 0,"automobile", "fa fa-automobile", 60, "#61A74D"'
			+ ' UNION SELECT 0,"phone", "fa fa-phone", 80, "#F4BCAC"'
			+ ' UNION SELECT 0,"banknote", "li li_banknote", 60 ,"#477306"'
			+ ' UNION SELECT 0,"comment", "fa fa-comment", 60, "#D39FE8"'
			+ ' UNION SELECT 0,"dribbble", "fa fa-dribbble", 60, "#F59D32"'
			+ ' UNION SELECT 0,"plane", "fa fa-plane", 60, "#8A1D30"'
			+ ' UNION SELECT 6,"gamepad", "fa fa-gamepad", 60, "#35203B"'
			+ ' UNION SELECT 0,"puzzle", "fa fa-puzzle-piece", 60, "#9BB144"'
			+ ' UNION SELECT 0,"beer", "fa fa-beer", 60, "#FE5850"'
			+ ' UNION SELECT 0,"glass", "fa fa-glass", 60, "#164065"'
			+ ' UNION SELECT 0,"video", "li li_video", 60, "#37A1FE"'
			+ ' UNION SELECT 0,"hospital", "fa fa-hospital-o", 60, "#5C89B2"'
			+ ' UNION SELECT 4,"cutlery", "fa fa-cutlery", 60, "#87C038"'
			+ ' UNION SELECT 3,"desktop", "fa fa-desktop", 60, "#F2C12E"'
			+ ' UNION SELECT 2,"moon", "fa fa-moon-o", 60, "#F27127"'
			+ ' UNION SELECT 0,"mobile", "fa fa-mobile", 90, "#F24E29"'
			+ ' UNION SELECT 5,"coffee", "fa fa-coffee", 60, "#267FB8"'
			+ ' UNION SELECT 0,"tv", "li li_tv", 65, "#66D9B8"'
			+ ' UNION SELECT 0,"shirt", "li li_t-shirt", 60, "#FBDC01"'
			+ ' UNION SELECT 0,"home", "fa fa-home", 60, "#FFA14A"'
			+ ' UNION SELECT 0,"trash", "li li_trash", 60, "#E85649"'
			+ ' UNION SELECT 0,"scissors", "fa fa-scissors", 60, "#E85649"'
			+ ' UNION SELECT 0,"flask", "fa fa-flask", 11, "#B7C11E"'
			+ ' UNION SELECT 0,"leaf", "fa fa-leaf", 60, "#88A825"'
			+ ' UNION SELECT 0,"pen", "li li_pen", 60, "#911146"'
			+ ' UNION SELECT 0,"bulb", "li li_bulb", 60, "#CF4A30"'
			+ ' UNION SELECT 0,"book", "fa fa-book", 60, "#218D80"'
			+ ' UNION SELECT 0,"bookmark", "fa fa-bookmark", 60, "#ED8C2B"'
			+ ' UNION SELECT 0,"child", "fa fa-child", 60, "#813DAC"'
			+ ' UNION SELECT 0,"stethoscope", "fa fa-stethoscope", 60, "#FF5760"'
			+ ' UNION SELECT 0,"spoon", "fa fa-spoon", 60, "#F0947C"'
			+ ' UNION SELECT 0,"code", "fa fa-code", 22, "#064B75"'
			+ ' UNION SELECT 0,"keyboard", "fa fa-keyboard-o", 60, "#008899"');
		
		// 초기화 완료 후 페이지 이동
		db_redirect();
		
	}, db_errorCB);
}

function db_redirect(){
	db.transaction(function(tx) {
		tx.executeSql('SELECT USER_NO FROM USER WHERE ID = 1', [], function(tx, res){
			console.log(res.rows);
			if(res.rows.length == 0 ){
				//local DB USER_NO field null이면 한번도 실행하지 않았으므로 welcome페이지
				window.location.href = "welcome.html";
			} else{
				//local DB USER_NO field null아니면 실행했었으므로 바로 main페이지
				window.location.href = "main.html";
			}
		});
	}, db_errorCB);
}

var db_errorCB = function(e) { // query 에러시 호출 함수
	console.log(e);
	console.log("e.message :" + e.message);
};
$(document).ready(function(){
	const checkPoint=960; //기준이 되는 수 설정
	var navWidth; //메뉴 너비 (변수)
	
	//해상도(960)를 기준으로 Desktop와 모바일을 나눔
	function menuControl(){
		if( $(window).width() > checkPoint){ //961까지는 pc용
			initDesktop(); // 호출
			displayDesktop();
			
		}else{ //mobile용
			initMobile();
			displayMobile();
		}	
	}
	
	menuControl();//호출
	
	$(window).resize(function(){
		menuControl();
	});
	
	//Desktop용 초기화 함수 (가려주는 것)
	function initDesktop(){ 
		$(".sub_menu, .dim").hide();
		$(".container").css("left",0);
		$("body").css("overflow-y", "auto"); //스크롤 x
	} 
	
	//Desktop용 메뉴 (보이게 하기)
	function displayDesktop(){ //계속 왔다갔다 하니까 stop 적기 
		$(".main_menu > li").on("mouseenter",function(){ //마우스 on 했을 때
			$(this).find(".sub_menu").stop().slideDown(); //선언만 한 상태	
			//$(this).parent().siblings().children(".sub_menu").stop().hide();			
		}).on("mouseleave", function(){
			$(".sub_menu").stop().slideUp();
		});
	}


	//mobile용 초기화 함수
	function initMobile(){
		//$(".gnb nav").hide();
		$(".sub_menu, .dim").hide();
		$(".sub_menu").css("height","auto");
		$(".mobile_menu_btn").removeClass("on"); //닫기
		$(".container").css("left",0);
		$("body").css("overflow-y", "auto");
		
		//480px과 브라우저의 너비 중에 작은 수를 선택하여 container의 left값에 적용
		navWidth = Math. min( 480,$(window).width() ); 
	}
	
	
	//mobile용 메뉴 -클릭하면 나와라
	function displayMobile(){
		$(".main_menu > li ").off("mouseenter mouseleave");
		$(".mobile_menu_btn").off().on("click", function(e){ //a 기본동작 막기 / off->다른거 충돌 방지
			e.preventDefault();
			//$(".gnb nav").show(); 메뉴를 화면 밖으로 내보낼것이기때문에 굳이 필요 x 
			$(this).toggleClass("on"); //햄버거 메뉴 <-> 닫기 버튼 
			$(".dim").stop().fadeToggle();
			
			if($(this).hasClass("on")){ // 햄버거 메뉴에서 클릭시
				$(".container").css("left",-navWidth);	//container의 left값에 적용 
				$("body").css("overflow-y", "hidden"); //스크롤 사라지게하기
			}else{ //닫기 버튼 클릭시
				$(".container").css("left",0);
				$("body").css("overflow-y", "auto");
		
			}
		});
		
		$(".dim").on("click",function(){
			//$(this).stop().fadeOut(); //닫기
			initMobile();
			//$(".mobile_menu_btn").removeClass("on"); //닫기
			//$(".container").css("left",0);
			//$("body").css("overflow-y", "auto");
		});
		
		$(".main_menu > li > a").off().on("click",function(){
			$(this).next(".sub_menu").stop().slideToggle(); //sub_menu 
			$(this).parent().siblings().children(".sub_menu").stop().slideUp(); //나를 기준으로 parent,siblings등 다른것 닫기
		});
	}
});
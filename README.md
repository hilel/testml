testml - Test Driven Html - jquery plugin
==========================================

Testing by comments conventions :

```html
<!-- JQUERY-SELECTOR test -> FULL/SHORTEN-PROPERTY-NAME : VALUE-TO-TEST   -->
        <!-- #header test -> top:0px, left:>=0px, h:45px -->
```        
or      

```html
<!-- JQUERY-SELECTOR test -> FULL/SHORTEN-PROPERTY-NAME : VALUE-TO-TEST  FROM SELECTOR-2  -->
      <!-- .logo img test -> left:5px from #header > .cont-wrapper -->
```

Working Demo
-------------

```html
<body>
<!-- #body test -> top:0px, left: 0px, w:100%  -->
<div id="body" class="main-wrapper">

    <!-- #header test -> top:0px, left:>=0px, h:45px -->
  <header id="header">
	            <!-- .cont-wrapper test -> w:<=400px -->
		        <div class="cont-wrapper">
                            
			                <div class="logo">

                                <a href="#">
                                    <!-- .logo img test -> left:5px from #header > .cont-wrapper -->
				                    <img alt="!" src="/img/banner.png"/><!-- end .logo  img -->
                                </a>
			                </div><!-- end #header .logo -->

			                <div class="open-account">
                                <!-- .open-account>a test -> top:7px -->
				                <a class="" href="#"><span>Open Account</span></a>
			                </div><!-- end #header .open-account-->

		        </div><!-- end #header > .cont-wrapper -->

	</header><!-- end #header  -->

    <article class="banner">


        <!-- .banner h1 test -> top:40px from #header -->
        <h1>Tester of the tests HTMLs and Css`s</h1>    
    </article>
	
</div><!-- end #body -->


<script>    window.jQuery || document.write('<script src="http://ajax.aspnetcdn.com/ajax/jquery/jquery-2.0.2.min.js"><\/script>');
            window.jQuery || document.write('<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"><\/script>');</script>
            
<script  src="/js/testml.js"></script>
<script type="text/javascript">
    $(function () {
        $('*').testHtml();
    });
</script>
</body>
```

$.fn.testHtml = function (parent) {
    var tests = $([]);

    this.each(
  	function (ind, node) {
		    var childNode = node.firstChild;

		    while (childNode) {
		        if (childNode.nodeName === "#comment" || childNode.nodeType === 8) {
		            // comment tag
		            // Check if is test
		            if (childNode.nodeValue.indexOf('test -> ') > -1) {

		                var testSplit = childNode.nodeValue.split(' test -> '),
		                    testVal = testSplit[1],
                            sel = testSplit[0];

		                console.log('Testing -> ' + sel + '  if:  ' + testVal);
		                console.debug($(sel.trim())[0]);
		                if (testVal.indexOf(' from ') > -1) {
		                    console.log('    -    if    -    ' + testVal);
		                    console.debug($(testVal.split('from')[1])[0]);
		                }
		                testAll(sel, testVal);
		            }
		        }

		        childNode = childNode.nextSibling;
		    }
		});

    function testAll(sel, toTest) {
        var tests = toTest.split(',');
        for (var i = 0; i < tests.length; i++) {
            var testSplit = tests[i].split(':'),
                testKey = testSplit[0],
                testVal = testSplit[1];
            test(sel.trim(), testKey.trim(), testVal.trim());
        }
    }


    function test(sel, key, val) {
        var result;
        if (key.indexOf('top') > -1 || key.indexOf('left') > -1) { result = testPos(sel, key, val); }
        else if (key == 'w' || key == 'h') { result = testBox(sel, key, val); }

        var msg = '';

        msg = result.passed ? 'PASSED !' : 'FAILED !';
        msg += '   expected -> ' + sel + ' : { ' + key + ' = ' + val + ' }\n';
        msg += '           got -> ' + sel + ' : { ' + key + ' = ' + result.val + ' }\n';
        if (result.passed) { console.warn(msg); }
        else { console.error(msg); }
    }

    function testPos(sel, key, val) {
        var testSign = getSign(val.split(' from ')[0]),
            valToTest = val,
            offS = $(sel)['offset'](),
            result = false,
            resVal,
            $sel2;

        if (valToTest.indexOf(testSign) > -1 /*&& testSign != '=='*/) { valToTest = valToTest.substring(testSign.length); }
        if (val.indexOf(' from ') > -1) {
            $sel2 = $(val.split(' from ')[1]);
            offS = $sel2['offset']();
        }

        switch (key) {
            case 'top': if (!$sel2) { resVal = offS.top; }
                else { resVal = Math.abs((offS.top + $sel2.outerHeight(true)) - $(sel).offset().top); }
                break;
            case 'left': if (!$sel2) { resVal = offS.left; }
                else { resVal = Math.abs(offS.left - $(sel).offset().left); }
                break;
        }
        result = eval(resVal + testSign + parseInt(valToTest));

        return { passed: result, val: resVal }

        function testRel(sel1, valToSplit) {

        }
    }

    function testBox(sel, key, val) {
        var testSign = getSign(val),
            valToTest = val;

        switch (testSign) {
            case '<=': valToTest = valToTest.substring('<='.length);
        }
        valToTest = (valToTest.indexOf('100%') > -1) ? $(document).outerWidth() : parseInt(valToTest);

        if (val.indexOf('100%') > -1) { console.log('100% width = ' + $(document).outerWidth()); }
        var result = false,
            resVal;
        switch (key) {
            case 'w': resVal = $(sel).outerWidth(); result = eval(resVal + testSign + valToTest); break;
            case 'h': resVal = $(sel).outerHeight(); result = eval(resVal + testSign + valToTest); break;
        }
        return { passed: result, val: resVal }
    }

    function getSign(tstVal) {
        if (tstVal.indexOf('<=') > -1) { return '<='; }
        if (tstVal.indexOf('<') > -1) { return '<'; }
        if (tstVal.indexOf('>=') > -1) { return '>='; }
        if (tstVal.indexOf('>') > -1) { return '>'; }
        if (tstVal.indexOf('!=') > -1) { return '!='; }
        return '==';
    }
}

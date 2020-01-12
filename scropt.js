1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
$(document).ready(function (){
    
    var Validation = (function (){
        var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var digitReg = /^\d+$/;
        
        var isEmail = function (email){
            return emailReg.test(email);
        };
        var isNumber = function (value){
            return digitReg.test(value);
        };
        var isRequire = function (value){
            return value == "";
        };
        var countChars = function (value, count){
            return value.length == count;
        };
        var isChecked = function (el){
            var hasCheck = false;
            el.each(function (){
                if($(this).prop('checked')){
                    hasCheck = true;
                }
            });
            return hasCheck;
        };
        return {
            isEmail : isEmail,
            isNumber : isNumber,
            isRequire: isRequire,
            countChars: countChars,
            isChecked: isChecked
        };
    })();
    
    var required = $('form').find('[data-required]');
    var numbers = $('form').find('[data-number]');
    var emails = $('form').find('[data-email]');
    var once = $('form').find('[data-once]');
    var radios = $('.form-item-triple');
    var groups = [];
    radios.each(function (){
        groups.push($(this).find('[data-once]'));
    });
    var counts = $('form').find('[data-count]');
    
    $('#submit').on('click', function (){
        required.each(function (){
            if(Validation.isRequire($(this).val())){
                $(this).siblings('small.errorReq').show();
            }
        });
        emails.each(function (){
            if(!Validation.isEmail($(this).val())){
                $(this).siblings('small.errorEmail').show();
            }
        });
        $.each(groups, function (){
            if(!Validation.isChecked($(this))){
                $(this).parents('.form-item').find('small.errorOnce').show();
            }
        });
        numbers.each(function (){
            if(!Validation.isNumber($(this).val())){
                $(this).siblings('small.errorNum').show();
            }
        });
        counts.each(function (){
            if(!Validation.countChars($(this).val(), $(this).data('count'))){
                $(this).siblings('small.errorChar').show();
            }
        });
    });
    
    required.on('keyup blur', function (){
        if(!Validation.isRequire($(this).val())){
            $(this).siblings('small.errorReq').hide();
        }
    });
    emails.on('keyup blur', function (){
        if(Validation.isEmail($(this).val())){
            $(this).siblings('small.errorEmail').hide();
        }
    });
    once.on('change', function (){
        $.each(groups, function (i){
            if(Validation.isChecked(groups[i])){
                groups[i].parents('.form-item').find('small.errorOnce').hide();
            }
        });
    });
    numbers.on('keyup blur', function (){
        if(Validation.isNumber($(this).val())){
            $(this).siblings('small.errorNum').hide();
        }
    });
    counts.on('keyup blur', function (){
         if(Validation.countChars($(this).val(), $(this).data('count'))){
            $(this).siblings('small.errorChar').hide();
        }
    });
    
});
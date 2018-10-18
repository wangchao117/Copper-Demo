$(function () {

  'use strict';

  var console = window.console || { log: function () { } };
  var $body = $('body');


  // Tooltip
  $('[data-toggle="tooltip"]').tooltip();
  $.fn.tooltip.noConflict();
  $body.tooltip();


  // Demo
  // ---------------------------------------------------------------------------

  (function () {
    var $image = $('.img-container > img');
    var $actions = $('.docs-buttons');
    var $download = $('#download');
    var $dataX = $('#dataX');
    var $dataY = $('#dataY');
    var $dataHeight = $('#dataHeight');
    var $dataWidth = $('#dataWidth');
    var $dataRotate = $('#dataRotate');
    var $dataScaleX = $('#dataScaleX');
    var $dataScaleY = $('#dataScaleY');

    var $mathDisp = $("#show_code_math");
    var $mathCode = $("#show_code");
    var options = {
      aspectRatio: 0,
      preview: '.img-preview',
      crop: function (e) {
        $dataX.val(Math.round(e.x));
        $dataY.val(Math.round(e.y));
        $dataHeight.val(Math.round(e.height));
        $dataWidth.val(Math.round(e.width));
        $dataRotate.val(e.rotate);
        $dataScaleX.val(e.scaleX);
        $dataScaleY.val(e.scaleY);
      }
    };

    $image.on({
      'build.cropper': function (e) {
        //console.log(e.type);
      },
      'built.cropper': function (e) {
        //console.log(e.type);
      },
      'cropstart.cropper': function (e) {
        //console.log(e.type, e.action);
      },
      'cropmove.cropper': function (e) {
        //console.log(e.type, e.action);
      },
      'cropend.cropper': function (e) {
        //console.log(e.type, e.action);
      },
      'crop.cropper': function (e) {
        //console.log(e.type, e.x, e.y, e.width, e.height, e.rotate, e.scaleX, e.scaleY);
      },
      'zoom.cropper': function (e) {
        //console.log(e.type, e.ratio);
      }
    }).cropper(options);


    //截屏按钮事件 /RecoServices/image/screen
    $("#cut_screen").on('click', function () {
      var clz = "width:684px; height:200px; padding-top:100px; top:12px; left:22px; border-radius:5px; z-index:10; background:rgba(255,255,255,0.98) url(../img/loadin2.gif) center center no-repeat; text-align:center; font-size:24px;"
      $("#screening").show();
      var screenUrl = $.trim($("#screen_url").val());
      var postData = {};
      postData["url"] = screenUrl;
      var dataStr = JSON.stringify(postData);
      $.ajax({
        url: '/RecoServices/image/screen',
        headers: {
          'accept': 'application/json;charset=UTF-8',
          'wyun_user': 'wyun',
          'wyun_password': 'screen$3',
          'x_meta': ' ',
          'x_protocolversion': '1',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        method: "POST",
        dataType: 'json',
        data: dataStr,
        traditional: true,
        timeout: 20000,
        success: function (msg) {
          $("#screening").hide();
          console.log('success: ' + JSON.stringify(msg));
          //alert('Upload success');
          if (msg.error) {//出错
            $("#error_msg").html(msg.error);
          } else {
            //$image.attr('src','data:image/.png;base64,' + msg.image);
            $image.one('built.cropper', function () {
              URL.revokeObjectURL('data:image/.png;base64,' + msg.encodedImage);
            }).cropper('reset').cropper('replace', 'data:image/.png;base64,' + msg.encodedImage);
            $("button.close").click();
          }

        },
        error: function (e) {
          $("#screening").hide();
          if (e.statusText == 'timeout') {
            var errorStr = 'Request timeout';
          } else {
            var respJson = e.responseJSON;
            var errorStr = e.statusText + ', ' + respJson.message;
          }
          $("#error_msg").html(errorStr);
        }
      });

    });

    // Buttons
    if (!$.isFunction(document.createElement('canvas').getContext)) {
      $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
      // wangchaoxiugai
      $('button[data-method="crop"]').prop('disabled', true);
      // wangchaoxiugaijieshu
    }

    if (typeof document.createElement('cropper').style.transition === 'undefined') {
      $('button[data-method="rotate"]').prop('disabled', true);
      $('button[data-method="scale"]').prop('disabled', true);
    }


    // Download
    if (typeof $download[0].download === 'undefined') {
      $download.addClass('disabled');
    }
    var fileType;

    // Options
    $actions.on('change', ':checkbox', function () {
      var $this = $(this);
      var cropBoxData;
      var canvasData;

      if (!$image.data('cropper')) {
        return;
      }

      options[$this.val()] = $this.prop('checked');

      cropBoxData = $image.cropper('getCropBoxData');
      canvasData = $image.cropper('getCanvasData');
      options.built = function () {
        $image.cropper('setCropBoxData', cropBoxData);
        $image.cropper('setCanvasData', canvasData);
      };

      $image.cropper('destroy').cropper(options);
    });
    // Methods
    $actions.on('click', '[data-method]', function () {
      var $this = $(this);
      var data = $this.data();
      var $target;
      var result;
      if ($this.prop('disabled') || $this.hasClass('disabled')) {
        return;
      }

      if ($image.data('cropper') && data.method) {
        data = $.extend({}, data); // Clone a new one

        if (typeof data.target !== 'undefined') {
          $target = $(data.target);

          if (typeof data.option === 'undefined') {
            try {
              data.option = JSON.parse($target.val());
            } catch (e) {
              console.log(e.message);
            }
          }
        }

        result = $image.cropper(data.method, data.option, data.secondOption);

        if (data.flip === 'horizontal') {
          $(this).data('option', -data.option);
        }

        if (data.flip === 'vertical') {
          $(this).data('secondOption', -data.secondOption);
        }

        if (data.method === 'crop' && result) {
          
        }

        if (data.method === 'getCroppedCanvas' && result) {
          /* $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);

          if (!$download.hasClass('disabled')) {
            $download.attr('href', result.toDataURL());
          }*/
          // Upload cropped image to server
          //$.ajaxSetup({contentType: 'application/x-www-form-urlencoded'});
          if ((fileType == '' || fileType == undefined) && $image.attr('src') == 'img/blank.png') {
            $("#show_box_inner").after('<div id="upload_imgtips" class="alert alert-danger avatar-alert alert-dismissable"><button type="button" class="close" data-dismiss="alert">&times;</button>recognition error: Please choose a picture</div>');
            return false;
          }
          $("#loading").show();
          var formData = new FormData();
          var encode = result.toDataURL().replace('data:image/png;base64,', '');
          if ($image.attr('src') == 'img/blank.png') {
            var imgType = fileType.split('/')[1];
          } else {
            var imgType = 'png';
          }
          var mydata = {};
          mydata["type"] = imgType.toUpperCase();
          mydata["encodedImage"] = encode;
          var dataStr = JSON.stringify(mydata);
          $.ajax({
            url: '/RecoServices/image/ADDRESS/USA',
            headers: {
              'accept': 'application/json;charset=UTF-8',
              'wyun_user': 'wyunClient',
              'wyun_password': 'lank1ng$',
              'x_meta': ' ',
              'x_protocolversion': '1',
              'Content-Type': 'application/json;charset=UTF-8'
            },
            method: "POST",
            dataType: 'json',
            data: dataStr,
            traditional: true,
            timeout: 60000,
            success: function (data) {
              $("#loading").hide();
              console.log('success: ' + JSON.stringify(data));
              //alert('Upload success');

              var headDiv = $mathDisp.children().first();
              //clear div
              headDiv.html('');
              var mapObj = data.values;
              var divPrefix = '<div dir="ltr">';
              var divAftfix = '</div>'
              //var total = mapObj.total;
              for (var i = 0; i < mapObj.total; i++) {
                var key = "entry" + i;
                var ltr_e = divPrefix + mapObj[key] + divAftfix;
                //alert("ltr: " + ltr_e);
                //headDiv.append( $(ltr_e));  //doesnt work
                var customDiv = $("<div>");
                customDiv.text(mapObj[key]);
                headDiv.append(customDiv);
              }
              console.log(headDiv.html());
              var html = headDiv.html();
              //display math

              $mathDisp.show();
              MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

              //var html = document.getElementById("show_code_math").innerHTML;
              $("#show_code").html(html).show();
            },
            error: function (e) {
              $("#loading").hide();
              if (e.statusText == 'timeout') {
                var errorStr = 'Request timeout';
              } else {
                var respJson = e.responseJSON;
                var errorStr = e.statusText + ', ' + respJson.message;
              }
              $("#show_box_inner").after('<div id="upload_imgtips" class="alert alert-danger avatar-alert alert-dismissable"><button type="button" class="close" data-dismiss="alert">&times;</button>recognition error: ' + errorStr + '</div>');
            }
          });
        }

        if ($.isPlainObject(result) && $target) {
          try {
            $target.val(JSON.stringify(result));
          } catch (e) {
            console.log(e.message);
          }
        }

      }
    });


    // Keyboard
    $body.on('keydown', function (e) {

      if (!$image.data('cropper') || this.scrollTop > 300) {
        return;
      }

      switch (e.which) {
        case 37:
          e.preventDefault();
          $image.cropper('move', -1, 0);
          break;

        case 38:
          e.preventDefault();
          $image.cropper('move', 0, -1);
          break;

        case 39:
          e.preventDefault();
          $image.cropper('move', 1, 0);
          break;

        case 40:
          e.preventDefault();
          $image.cropper('move', 0, 1);
          break;
      }

    });

    // Import image
    var $inputImage = $('#inputImage');
    var URL = window.URL || window.webkitURL;
    var blobURL;

    if (URL) {
      $inputImage.change(function () {
        var files = this.files;
        var file;

        if (!$image.data('cropper')) {
          return;
        }

        if (files && files.length) {
          file = files[0];
          if (file.size >= 10485760) {//选择超过10M的图片
            $("#show_box_inner").after('<div id="upload_imgtips" class="alert alert-danger avatar-alert alert-dismissable"><button type="button" class="close" data-dismiss="alert">&times;</button>选择的图片超过10M</div>');
            return false;
          }
          if (/^image\/\w+$/.test(file.type)) {
            fileType = file.type;
            blobURL = URL.createObjectURL(file);
            $image.one('built.cropper', function () {
              URL.revokeObjectURL(blobURL); // Revoke when load complete
            }).cropper('reset').cropper('replace', blobURL);
            $inputImage.val('');
          } else {
            $body.tooltip('Please choose an image file.', 'warning');
          }
        }
      });
    } else {
      $inputImage.prop('disabled', true).parent().addClass('disabled');
    }

  }());

});

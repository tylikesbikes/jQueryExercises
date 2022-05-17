console.log('Let\'s get ready to party with jQuery!');

$('article img').addClass('image-center');

$('p').eq(-1).remove();

const randomFontSize = Math.floor(Math.random()*101); // using const randomFontSize = Math.floor(Math.random()*100) + 1;  would preclude the possibility of font size 0.

$('#title').css('font-size',randomFontSize+'px');

$('ol').append('<li>Short bullet points make for a great thesis summary</li>');

$('aside').html('').append('<p>Sorry for the list that was here previously.  Its creator has been sacked.</p>');

$('.row.mb-5').on('change','.form-control', function() {
    const rgbInputs = $('.row.mb-5 .form-control');

    const r = rgbInputs.eq(0).val();
    const g = rgbInputs.eq(1).val();
    const b = rgbInputs.eq(2).val();

    $('body').css('background-color',`rgb(${r},${g},${b})`);
})

$('img').on('click',function() {
    $(this).remove();
})
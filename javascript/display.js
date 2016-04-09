
function toggleActiveTabGame() {
  document.getElementById('tabs_game').classList.add('tabs_btn_active');
  document.getElementById('tabs_char').classList.remove('tabs_btn_active');
  document.getElementById('tabs_craft').classList.remove('tabs_btn_active');

  document.getElementById('tabs_content_game').classList.add('tabs_content_active');
  document.getElementById('tabs_content_char').classList.remove('tabs_content_active');
  document.getElementById('tabs_content_craft').classList.remove('tabs_content_active');
}
function toggleActiveTabChar() {
  document.getElementById('tabs_game').classList.remove('tabs_btn_active');
  document.getElementById('tabs_char').classList.add('tabs_btn_active');
  document.getElementById('tabs_craft').classList.remove('tabs_btn_active');

  document.getElementById('tabs_content_game').classList.remove('tabs_content_active');
  document.getElementById('tabs_content_char').classList.add('tabs_content_active');
  document.getElementById('tabs_content_craft').classList.remove('tabs_content_active');
}
function toggleActiveTabCraft() {
  document.getElementById('tabs_game').classList.remove('tabs_btn_active');
  document.getElementById('tabs_char').classList.remove('tabs_btn_active');
  document.getElementById('tabs_craft').classList.add('tabs_btn_active');

  document.getElementById('tabs_content_game').classList.remove('tabs_content_active');
  document.getElementById('tabs_content_char').classList.remove('tabs_content_active');
  document.getElementById('tabs_content_craft').classList.add('tabs_content_active');
}

import "./index.scss";
import "bootstrap/js/dist/carousel";
import Offcanvas from "bootstrap/js/dist/offcanvas";  // 要實作側邊選單，就需要引入offcanvas
import Collapse from "bootstrap/js/dist/collapse";    // 要實作收合按鈕，就需要引入collapse
import { doc } from "prettier";

// 實作電腦版的收合按鈕功能
function collapsePCHandler() {
    // 取得裡面放兩個被收起來的分類div(為了new Collapse()物件)
    const collapse = document.getElementById("filter-collapse");

    // 取得收合按鈕的icon＆文字
    const collapseBtn = document.getElementById("filter-collapse-btn");

    // 取得收合按鈕的文字(為了點擊後改變文字內容)
    const collapseBtnText = document.getElementById("filter-btn-text");

    // 取得收合按鈕的icon(為了點擊後改變三角箭頭的方向，旋轉180度！)
    const filterIcon = document.getElementById("filter-icon");

    // 初始化收合選單
    const bsCollapse = new Collapse(collapse, {
        toggle: false,
    });

    // 點擊[收合按鈕的icon＆文字]，作收合動作
    collapseBtn.addEventListener("click", function() {
        bsCollapse.toggle();
    });

    collapse.addEventListener("show.bs.collapse", function() {
        collapseBtnText.innerText = "收起";
        filterIcon.classList.add("transform-rotate-180");
    });
    collapse.addEventListener("hide.bs.collapse", function() {
        collapseBtnText.innerText = "顯示更多";
        filterIcon.classList.remove("transform-rotate-180");
    });
}
collapsePCHandler();

// 實作手機版的收合按鈕功能
function collapseMobileHandler() {
    // 取得裡面放兩個被收起來的分類div(為了new Collapse()物件)
    const collapseMobile = document.getElementById("filter-mobile-collapse");
    
    // 取得收合按鈕的icon＆文字
    const collapseBtnMobile = document.getElementById("filter-mobile-collapse-btn");

    // 取得收合按鈕的文字(為了點擊後改變文字內容)
    const collapseBtnTextMobile = document.getElementById("filter-mobile-btn-text");

    // 取得收合按鈕的icon(為了點擊後改變三角箭頭的方向，旋轉180度！)
    const filterIconMobile = document.getElementById("filter-mobile-icon")

    // 初始化收合選單
    const bsCollapseMobile = new Collapse(collapseMobile, {
        // toggle設定為false代表一開始預設為收起來的狀態
        toggle: false,
    });

    // 點擊[收合按鈕的icon＆文字]，作收合動作
    collapseBtnMobile.addEventListener("click", function() {
        bsCollapseMobile.toggle();
    });

    // 當collapse為show的時候，將文字改成「收起」、icon改成旋轉180度
    collapseMobile.addEventListener("show.bs.collapse", function() {
        collapseBtnTextMobile.innerText = "收起";
        filterIconMobile.classList.add("transform-rotate-180");  // transform-rotate-180: 這是自定義在_custom.scss的class！
    });

    // 當collapse為hide的時候，將文字改回原本的「顯示更多」、icon的class移除「旋轉180度」
    collapseMobile.addEventListener("hide.bs.collapse", function() {
        collapseBtnTextMobile.innerText = "顯示更多";
        filterIconMobile.classList.remove("transform-rotate-180");
    });
}
collapseMobileHandler();

// 實作手機版的側邊選單功能
function offcanvasHandler() {
    // 抓取側邊選單最外層的div
    const myOffcanvas = document.getElementById("offcanvasSrolling");

    // 抓取打開側邊選單的按鈕
    const mobileFilterBtn = document.getElementById("mobile-filter-btn");

    // 初始化側邊選單
    const bsOffcanvas = new Offcanvas(
        myOffcanvas,
        {
            backdrop: true,
        }
    );

    mobileFilterBtn.addEventListener("click", function(e) {
        e.stopPropagation();   // 停止事件？？
        bsOffcanvas.toggle();  // 點擊按鈕後，側邊選單會打開！
    });
}
offcanvasHandler();

// 用JS產生20個商品的card
function renderItems() {
    // 取得放商品列表的div
    const list = document.getElementById("list");

    // 迴圈產生20個card
    for (let i = 0; i < 20; i++) {
        // 產生<div class="col">
        const colItem = document.createElement("div");
        colItem.classList.add("col");

        colItem.innerHTML = `
            <div class="mt-4">
                <div class="card">
                    <img src="https://bruce-fe-ec.web.app/images/item.png" class="card-img-top" >
                    <div class="card-body pb-0">
                        <h5 class="card-title text-primary">$2000</h5>
                        <p class="card-text fs-7">這是一罐沐浴乳這是一罐沐浴乳這是一罐沐浴乳</p>
                        <!-- text-end: 文字靠右對齊
                            fs-8: 自定義font-sizes的class -->
                        <p class="card-text text-end fs-8">已售出 1000</p>  

                        <!-- 套用BS的badge樣式！在圖片右上角製作標籤的效果 -->
                        <span class="badge position-absolute top-0 end-0 bg-primary">雙11優惠</span>
                    </div>
                </div>
            </div>
        `
        // 在商品列表的div裡面加上商品的col
        list.appendChild(colItem);
    }
}
renderItems();

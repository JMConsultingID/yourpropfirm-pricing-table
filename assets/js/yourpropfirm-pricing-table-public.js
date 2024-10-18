(function($) {
    'use strict';
    let activeSlideIndex = 0; // Variable to store the active slide index

    // Initialize tippy tooltips
    document.addEventListener("DOMContentLoaded", function() {
        tippy(".yourpropfirm-pricing-table-label-tooltips", {
            theme: 'light',
            placement: 'right',
            arrow: false,
            animation: 'fade',
            allowHTML: true,
            interactive: true,
            delay: [100, 100],
        });
    });

    const initTabSwiper = (tabContent) => {
        if (window.innerWidth <= 991) {
            const swiperInstance = new Swiper(tabContent.querySelector('.swiper'), {
                slidesPerView: "auto",
                spaceBetween: 5,
                grabCursor: true,
                keyboard: true,
                autoHeight: false,
                navigation: {
                    nextEl: tabContent.querySelector(".mobile__nav__btn:last-of-type"),
                    prevEl: tabContent.querySelector(".mobile__nav__btn:first-of-type"),
                },
                on: {
                    slideChange: () => {
                        activeSlideIndex = swiperInstance.activeIndex;
                        updateNavButtons(swiperInstance, tabContent);
                    }
                }
            });

            updateNavButtons(swiperInstance, tabContent);
            return swiperInstance;
        }
    }

    const updateNavButtons = (swiperInstance, tabContent) => {
        const prevButton = tabContent.querySelector(".mobile__nav__btn:first-of-type");
        const nextButton = tabContent.querySelector(".mobile__nav__btn:last-of-type");

        prevButton.classList.toggle('swiper-button-disabled', swiperInstance.isBeginning);
        nextButton.classList.toggle('swiper-button-disabled', swiperInstance.isEnd);
    }

    const initTabs = (levelClass, initNextLevel) => {
        const tabButtons = document.querySelectorAll(`${levelClass} .yourpropfirm-pricing-table-tab-button`);
        const tabContents = document.querySelectorAll(`${levelClass} .yourpropfirm-pricing-table-tab-content`);

        if (!tabButtons.length || !tabContents.length) return;

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                button.classList.add('active');
                const tabId = button.dataset.tabId;
                const activeTabContent = document.querySelector(`${levelClass} .yourpropfirm-pricing-table-tab-content[data-tab-id="${tabId}"]`);
                activeTabContent.classList.add('active');

                if (activeTabContent.swiperInstance) {
                    activeTabContent.swiperInstance.slideTo(activeSlideIndex, 0);
                } else if (window.innerWidth <= 991) {
                    activeTabContent.swiperInstance = initTabSwiper(activeTabContent);
                    activeTabContent.swiperInstance.slideTo(activeSlideIndex, 0);
                }

                if (initNextLevel) {
                    initNextLevel(activeTabContent);
                }
            });
        });

        const activeTabContent = document.querySelector(`${levelClass} .yourpropfirm-pricing-table-tab-content.active`);
        if (activeTabContent && !activeTabContent.swiperInstance && window.innerWidth <= 991) {
            activeTabContent.swiperInstance = initTabSwiper(activeTabContent);
            activeTabContent.swiperInstance.slideTo(activeSlideIndex, 0);
        }
    }

    const initLevel3Tabs = (mainTab) => {
        initTabs('.yourpropfirm-pricing-table-table-level-3', null);
    }

    const initLevel2Tabs = (mainTab) => {
        initTabs('.yourpropfirm-pricing-table-table-level-2', initLevel3Tabs);
    }

    const initLevel1Tabs = () => {
        initTabs('.yourpropfirm-pricing-table-table-level-1', initLevel2Tabs);
    }

    const initAllSwipers = () => {
        document.querySelectorAll('.yourpropfirm-pricing-table-tab-content').forEach(tabContent => {
            if (tabContent.classList.contains('active')) {
                if (!tabContent.swiperInstance && window.innerWidth <= 991) {
                    tabContent.swiperInstance = initTabSwiper(tabContent);
                    tabContent.swiperInstance.slideTo(activeSlideIndex, 0);
                }
            } else if (tabContent.swiperInstance) {
                tabContent.swiperInstance.destroy();
                tabContent.swiperInstance = null;
            }
        });
    }

    initAllSwipers();
    window.addEventListener('resize', initAllSwipers);
    document.querySelectorAll('.yourpropfirm-pricing-table-tab-button').forEach(button => {
        button.addEventListener('click', initAllSwipers);
    });

    // Initialize main tabs for all levels
    initLevel1Tabs();
})(jQuery);

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

    // Function to initialize Swiper for each tab
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
                        activeSlideIndex = swiperInstance.activeIndex; // Update activeSlideIndex on slide change
                        updateNavButtons(swiperInstance, tabContent);
                    }
                }
            });

            updateNavButtons(swiperInstance, tabContent);

            return swiperInstance;
        }
    }

    // Function to update navigation buttons' disabled state
    const updateNavButtons = (swiperInstance, tabContent) => {
        const prevButton = tabContent.querySelector(".mobile__nav__btn:first-of-type");
        const nextButton = tabContent.querySelector(".mobile__nav__btn:last-of-type");

        if (swiperInstance.isBeginning) {
            prevButton.classList.add('swiper-button-disabled');
        } else {
            prevButton.classList.remove('swiper-button-disabled');
        }

        if (swiperInstance.isEnd) {
            nextButton.classList.add('swiper-button-disabled');
        } else {
            nextButton.classList.remove('swiper-button-disabled');
        }
    }

    // Initialize tabs for Level 1
    const initLevel1Tabs = () => {
        const tabButtons = document.querySelectorAll('.yourpropfirm-pricing-table-table-level-1 .yourpropfirm-pricing-table-tab-button');
        const tabContents = document.querySelectorAll('.yourpropfirm-pricing-table-table-level-1 .yourpropfirm-pricing-table-tab-content');

        if (!tabButtons.length || !tabContents.length) {
            return;
        }

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                button.classList.add('active');
                const tabId = button.dataset.tabId;
                const activeTabContent = document.querySelector(`.yourpropfirm-pricing-table-table-level-1 .yourpropfirm-pricing-table-tab-content[data-tab-id="${tabId}"]`);
                activeTabContent.classList.add('active');

                // Set the active slide index for the new tab
                if (activeTabContent.swiperInstance) {
                    activeTabContent.swiperInstance.slideTo(activeSlideIndex, 0); // Use slideTo with no animation
                } else if (window.innerWidth <= 991) {
                    activeTabContent.swiperInstance = initTabSwiper(activeTabContent);
                    activeTabContent.swiperInstance.slideTo(activeSlideIndex, 0);
                }
            });
        });

        // Initialize swiper for the active main tab
        const activeTabContent = document.querySelector('.yourpropfirm-pricing-table-table-level-1 .yourpropfirm-pricing-table-tab-content.active');
        if (activeTabContent && !activeTabContent.swiperInstance && window.innerWidth <= 991) {
            activeTabContent.swiperInstance = initTabSwiper(activeTabContent);
            activeTabContent.swiperInstance.slideTo(activeSlideIndex, 0);
        }
    }

    // Initialize tabs for Level 2
    const initLevel2Tabs = () => {
        const tabButtons = document.querySelectorAll('.yourpropfirm-pricing-table-table-level-2 .yourpropfirm-pricing-table-tab-button, .yourpropfirm-pricing-table-table-mode-1 .yourpropfirm-pricing-table-tab-button');
        const tabContents = document.querySelectorAll('.yourpropfirm-pricing-table-table-level-2 .yourpropfirm-pricing-table-tab-content, .yourpropfirm-pricing-table-table-mode-1 .yourpropfirm-pricing-table-tab-content');

        if (!tabButtons.length || !tabContents.length) {
            return;
        }

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                button.classList.add('active');
                const tabId = button.dataset.tabId;
                const activeTabContent = document.querySelector(`.yourpropfirm-pricing-table-table-level-2 .yourpropfirm-pricing-table-tab-content[data-tab-id="${tabId}"], .yourpropfirm-pricing-table-table-mode-1 .yourpropfirm-pricing-table-tab-content[data-tab-id="${tabId}"]`);
                activeTabContent.classList.add('active');

                // Set the active slide index for the new tab
                if (activeTabContent.swiperInstance) {
                    activeTabContent.swiperInstance.slideTo(activeSlideIndex, 0); // Use slideTo with no animation
                } else if (window.innerWidth <= 991) {
                    activeTabContent.swiperInstance = initTabSwiper(activeTabContent);
                    activeTabContent.swiperInstance.slideTo(activeSlideIndex, 0);
                }
            });
        });

        // Initialize swiper for the active main tab
        const activeTabContent = document.querySelector('.yourpropfirm-pricing-table-table-level-2 .yourpropfirm-pricing-table-tab-content.active, .yourpropfirm-pricing-table-table-mode-1 .yourpropfirm-pricing-table-tab-content.active');
        if (activeTabContent && !activeTabContent.swiperInstance && window.innerWidth <= 991) {
            activeTabContent.swiperInstance = initTabSwiper(activeTabContent);
            activeTabContent.swiperInstance.slideTo(activeSlideIndex, 0);
        }

        // Activate the first tab on initial load
        const firstTabButton = document.querySelector('.yourpropfirm-pricing-table-table-level-2 .yourpropfirm-pricing-table-tab-button, .yourpropfirm-pricing-table-table-mode-1 .yourpropfirm-pricing-table-tab-button');
        if (firstTabButton) {
            firstTabButton.click();
        }
    }

    // Initialize tabs for Level 3
    const initLevel3Tabs = () => {
        const tabButtons = document.querySelectorAll('.yourpropfirm-pricing-table-table .jeg-elementor-kit .tab-nav');
        const tabContents = document.querySelectorAll('.yourpropfirm-pricing-table-table .jeg-elementor-kit .tab-content');

        if (!tabButtons.length || !tabContents.length) {
            return;
        }

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                button.classList.add('active');
                const tabId = button.dataset.tab;
                const activeContent = document.querySelector(`.yourpropfirm-pricing-table-table .jeg-elementor-kit .tab-content.${tabId}`);
                activeContent.classList.add('active');
            });
        });

        // Initialize the first active tab for level 3 on load
        const firstActiveTab = document.querySelector('.yourpropfirm-pricing-table-table .jeg-elementor-kit .tab-nav.active');
        if (firstActiveTab) {
            const tabId = firstActiveTab.dataset.tab;
            const activeContent = document.querySelector(`.yourpropfirm-pricing-table-table .jeg-elementor-kit .tab-content.${tabId}`);
            activeContent.classList.add('active');
        }
    }

    // Initialize all tabs (Level 1, Level 2, Level 3)
    const initAllTabs = () => {
        initLevel1Tabs();
        initLevel2Tabs();
        initLevel3Tabs();
    }

    // Initialize all tabs when the page is loaded
    document.addEventListener('DOMContentLoaded', initAllTabs);

})(jQuery);

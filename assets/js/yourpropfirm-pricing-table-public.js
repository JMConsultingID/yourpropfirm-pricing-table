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
    // Initialize tabs for Level 2 dynamically based on the active tab in the jeg-elementor-kit
    const initLevel2Tabs = () => {
        // Find the active tab in jeg-elementor-kit
        const activeTabNav = document.querySelector('.jeg-elementor-kit .tab-nav.active');
        
        if (!activeTabNav) {
            return;
        }

        // Get the data-tab attribute of the active tab
        const activeTabId = activeTabNav.getAttribute('data-tab');

        // Use the active tab ID to find the corresponding tab-content
        const activeTabContent = document.querySelector(`.jeg-elementor-kit .tab-content.${activeTabId}`);
        
        if (!activeTabContent) {
            return;
        }

        // Now, within the active tab-content, find the buttons and contents for Level 2 tabs
        const tabButtons = activeTabContent.querySelectorAll('.yourpropfirm-pricing-table-table-level-2 .yourpropfirm-pricing-table-tab-button');
        const tabContents = activeTabContent.querySelectorAll('.yourpropfirm-pricing-table-table-level-2 .yourpropfirm-pricing-table-tab-content');

        if (!tabButtons.length || !tabContents.length) {
            return;
        }

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                button.classList.add('active');
                const tabId = button.dataset.tabId;
                const activeTabContentLevel2 = activeTabContent.querySelector(`.yourpropfirm-pricing-table-table-level-2 .yourpropfirm-pricing-table-tab-content[data-tab-id="${tabId}"]`);
                activeTabContentLevel2.classList.add('active');

                // Set the active slide index for the new tab
                if (activeTabContentLevel2.swiperInstance) {
                    activeTabContentLevel2.swiperInstance.slideTo(activeSlideIndex, 0); // Use slideTo with no animation
                } else if (window.innerWidth <= 991) {
                    activeTabContentLevel2.swiperInstance = initTabSwiper(activeTabContentLevel2);
                    activeTabContentLevel2.swiperInstance.slideTo(activeSlideIndex, 0);
                }

                // If there are sub-tabs in Level 3, initialize them
                initLevel3Tabs(activeTabContentLevel2);
            });
        });

        // Initialize swiper for the active Level 2 tab content within the active parent tab
        const activeTabContentLevel2 = activeTabContent.querySelector('.yourpropfirm-pricing-table-table-level-2 .yourpropfirm-pricing-table-tab-content.active');
        if (activeTabContentLevel2 && !activeTabContentLevel2.swiperInstance && window.innerWidth <= 991) {
            activeTabContentLevel2.swiperInstance = initTabSwiper(activeTabContentLevel2);
            activeTabContentLevel2.swiperInstance.slideTo(activeSlideIndex, 0);
        }
    }

    // Initialize sub-tabs for the active main tab
    const initSubTabs = (mainTab) => {
        if (!mainTab) return;

        const subTabButtons = mainTab.querySelectorAll('.yourpropfirm-pricing-table-sub-tab-button');
        const subTabContents = mainTab.querySelectorAll('.yourpropfirm-pricing-table-sub-tab-content');

        if (!subTabButtons.length || !subTabContents.length) {
            return;
        }

        subTabButtons.forEach(button => {
            button.addEventListener('click', () => {
                subTabButtons.forEach(btn => btn.classList.remove('active'));
                subTabContents.forEach(content => content.classList.remove('active'));

                button.classList.add('active');
                const subTabId = button.dataset.subTabId;
                const activeSubTabContent = mainTab.querySelector(`.yourpropfirm-pricing-table-sub-tab-content[data-sub-tab-id="${subTabId}"]`);
                activeSubTabContent.classList.add('active');

                // Set the active slide index for the new sub-tab
                if (activeSubTabContent.swiperInstance) {
                    activeSubTabContent.swiperInstance.slideTo(activeSlideIndex, 0); // Use slideTo with no animation
                } else if (window.innerWidth <= 991) {
                    activeSubTabContent.swiperInstance = initTabSwiper(activeSubTabContent);
                    activeSubTabContent.swiperInstance.slideTo(activeSlideIndex, 0);
                }
            });
        });

        // Initialize swiper for the active sub-tab
        const activeSubTabContent = mainTab.querySelector('.yourpropfirm-pricing-table-sub-tab-content.active');
        if (activeSubTabContent && !activeSubTabContent.swiperInstance && window.innerWidth <= 991) {
            activeSubTabContent.swiperInstance = initTabSwiper(activeSubTabContent);
            activeSubTabContent.swiperInstance.slideTo(activeSlideIndex, 0);
        }
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

    // Initialize main tabs for both levels
    initLevel1Tabs();
    initLevel2Tabs();
})(jQuery);
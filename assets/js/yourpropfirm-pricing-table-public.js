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

    // Initialize tabs for Level 1 and reinitialize Level 2 dynamically
    document.querySelectorAll('.jeg-elementor-kit .tab-nav').forEach(button => {
        button.addEventListener('click', () => {
            // Hilangkan class active dari semua tab level 1
            document.querySelectorAll('.jeg-elementor-kit .tab-nav').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.jeg-elementor-kit .tab-content').forEach(content => content.classList.remove('active'));

            // Tambahkan class active ke tab yang diklik
            button.classList.add('active');
            const tabId = button.dataset.tab;
            const activeContent = document.querySelector(`.jeg-elementor-kit .tab-content.${tabId}`);
            activeContent.classList.add('active');

            // Inisialisasi ulang event listener untuk level 2 tabs setelah tab level 1 diubah
            initLevel2Tabs(activeContent);
        });
    });

    // Fungsi untuk menginisialisasi event listener untuk Level 2 tabs
    const initLevel2Tabs = (activeTabContent) => {
        const level2Buttons = activeTabContent.querySelectorAll('.yourpropfirm-pricing-table-table-level-2 .yourpropfirm-pricing-table-tab-button');
        const level2Contents = activeTabContent.querySelectorAll('.yourpropfirm-pricing-table-table-level-2 .yourpropfirm-pricing-table-tab-content');

        if (!level2Buttons.length || !level2Contents.length) {
            return;
        }

        level2Buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Hilangkan class active dari semua tab level 2
                level2Buttons.forEach(btn => btn.classList.remove('active'));
                level2Contents.forEach(content => content.classList.remove('active'));

                // Tambahkan class active ke tab level 2 yang diklik
                button.classList.add('active');
                const tabId = button.dataset.tabId;
                const activeContent = activeTabContent.querySelector(`.yourpropfirm-pricing-table-table-level-2 .yourpropfirm-pricing-table-tab-content[data-tab-id="${tabId}"]`);
                activeContent.classList.add('active');

                // Inisialisasi ulang sub-tabs di dalam tab level 2 jika ada
                initSubTabs(activeContent);
            });
        });

        // Inisialisasi tab level 2 aktif jika ada
        const activeTabContentLevel2 = activeTabContent.querySelector('.yourpropfirm-pricing-table-table-level-2 .yourpropfirm-pricing-table-tab-content.active');
        if (activeTabContentLevel2 && window.innerWidth <= 991) {
            activeTabContentLevel2.swiperInstance = initTabSwiper(activeTabContentLevel2);
            activeTabContentLevel2.swiperInstance.slideTo(activeSlideIndex, 0);
        }
    }

    // Initialize sub-tabs for the active main tab (Level 3 or sub-tabs within Level 2)
    const initSubTabs = (mainTab) => {
        if (!mainTab) return;

        // Find sub-tab buttons and contents within the active main tab
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

        // Initialize swiper for the active sub-tab content
        const activeSubTabContent = mainTab.querySelector('.yourpropfirm-pricing-table-sub-tab-content.active');
        if (activeSubTabContent && window.innerWidth <= 991) {
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
})(jQuery);
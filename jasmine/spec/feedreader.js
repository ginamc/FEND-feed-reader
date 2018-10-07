/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
   
    describe('RSS Feeds', function() {
        /* This is our first test to make sure that the
         * allFeeds variable is defined and not empty. 
         */
        it('allFeeds variable are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed in the allFeeds object
         * and ensures it has a defined URL and that the URL is not empty.
         */
        it('all feeds have a url defined', function() {
            allFeeds.forEach(feed => {
                //make sure each feed has a URL param
                expect(feed.url).toBeDefined();
                // url is not an empty string
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* This test loops through each feed in the allFeeds object
         * and ensures a name is defined and not empty. 
         */
        it('all feeds have a name defined', function() {
            allFeeds.forEach(feed => {
                // make sure each feed has a name param
                expect(feed.name).toBeDefined();
                // feed name is not an empty string
                expect(feed.name.length).not.toBe(0);
            });
        });

    });


    /* This is a new test suite, called "The Menu," to test functionality
     * functionality and visibility of the menu icon.
     */

    describe('The menu', function() {

        /* This test makes sure the menu element is hidden by default. */
        it('menu is hidden by default', function() {
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });

        /* This test makes sure the menu's visibility changes when the icon is clicked.
         * Contains 2 expectations: (1) menu displays when clicked, (2) menu hides when clicked again.
         */
        it('menu becomes visible when clicked', function() {
            //simulating the menu button click
            $(".menu-icon-link").click();
            // check that the menu shows on click
            expect($("body").hasClass("menu-hidden")).toBe(false);

            // hide the menu when clicked on again
            $(".menu-icon-link").click();
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });
    });

    /* A new test suite named "Initial Entries" that ensures the loadFeed function does what it's supposed to */ 
    describe('Initial Entries', function() {
       
        /* This test ensures that when the loadFeed function is called, it completes its work */
        beforeEach(done => {
            loadFeed(0, done);
        });

        it('at least 1 entry is found when loadFeed is called and done', function() {
            expect($(".feed .entry").length).toBeGreaterThan(0);
        });

    });

    /* This is a new test suite named "New Feed Selection" that ensures a new feed is loaded by the loadFeed function*/
    describe('New Feed Selection', function() {
        
        /* This test ensures that the content of the feed changes when a 
         * new feed is loaded by the loadFeed function.
         */
        let feedOne,
            feedTwo;

        beforeEach(done => {
            // loads first feed
            loadFeed(0, function() {
                feedOne = $(".feed").html();
                done();
            });
            // loads second feed
            loadFeed(1, function() {
                feedTwo = $(".feed").html();
                done();
            });
        });

        it('content changes when a new feed is loaded', function() {
            expect(feedOne !== feedTwo).toBe(false);
        });

    });

}());

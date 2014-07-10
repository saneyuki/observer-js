/* vim: set filetype=javascript shiftwidth=4 tabstop=4 expandtab: */
/*
 * @repository  https://github.com/saneyuki/observer-js
 * @license     MIT License
 *
 * Copyright (c) 2014 Tetsuharu OHZEKI <saneyuki.snyk@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

"use strict";

describe("ObserverSubject.destroy()", function(){
    var ObserverSubject = window.ObserverSubject;
    var gSubject = null;
    var gObserver = null;

    beforeEach(function(){
        gSubject = new ObserverSubject();
        gObserver = {
            handleMessage: function () {
            }
        };
    });

    afterEach(function(){
        gSubject = null;
        gObserver = null;
    });

    it("finalize the subject", function(){
        var isCalled1 = true;
        var o1 = {
            handleMessage: function () {
                isCalled1 = false;
            }
        };

        var isCalled2 = true;
        var o2 = {
            handleMessage: function () {
                isCalled2 = false;
            }
        };

        var isCalled3 = true;
        var o3 = {
            handleMessage: function () {
                isCalled3 = false;
            }
        };

        gSubject.add("test1", o1);
        gSubject.add("test2", o2);
        gSubject.add("test3", o3);

        gSubject.destroy();

        gSubject.notify("test1", null);
        gSubject.notify("test2", null);
        gSubject.notify("test3", null);

        assert(isCalled2 === true, "should not call 'o1.handleMessage()' after the subject was destroyed.");
        assert(isCalled2 === true, "should not call 'o2.handleMessage()' after the subject was destroyed.");
        assert(isCalled2 === true, "should not call 'o3.handleMessage()' after the subject was destroyed.");
    });
});




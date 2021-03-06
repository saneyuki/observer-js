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

var assert = require("power-assert");

describe("ObserverSubject.add()", function(){
    var ObserverSubject = window.ObserverSubject;

    describe("valid case", function(){
        var resultTopic = "";
        var resultData = "";

        before(function(done){
            var gSubject = new ObserverSubject();
            var gObserver = {
                handleMessage: function (topic, data) {
                    resultTopic = topic;
                    resultData = data;

                    done();
                }
            };

            gSubject.add("test", gObserver);
            gSubject.notify("test", "hoge");
        });

        it("resultTopic should be assigned the expected value.", function(){
            assert.strictEqual(resultTopic, "test");
        });

        it("resultData should be assigned the expected value.", function(){
            assert.strictEqual(resultData, "hoge");
        });
    });

    describe("if the arg1 is invalid", function(){
        describe("the arg1 is nothing.", function () {
            var error = null;

            before(function(){
                var gSubject = new ObserverSubject();
                try {
                    gSubject.add();
                }
                catch (e) {
                    error = e;
                }
            });

            it("should be the instance of Error", function () {
                assert(error instanceof Error);
            });

            it("should be the expected message", function () {
                assert.strictEqual(error.message, "Aruguments are not passed fully.");
            });
        });

        describe("the arg1 is `null`", function () {
            var error = null;

            before(function(){
                var gSubject = new ObserverSubject();
                var gObserver = {
                    handleMessage: function (topic, data) {
                    }
                };

                try {
                    gSubject.add(null, gObserver);
                }
                catch (e) {
                    error = e;
                }
            });

            it("should be the instance of Error", function () {
                assert(error instanceof Error);
            });

            it("should be the expected message", function () {
                assert.strictEqual(error.message, "Aruguments are not passed fully.");
            });
        });
    });

    describe("if the arg2 is invalid", function(){
        describe("the arg2 is nothing", function () {
            var error = null;

            before(function(){
                var gSubject = new ObserverSubject();

                try {
                    gSubject.add("test");
                }
                catch (e) {
                    error = e;
                }
            });

            it("should be the instance of Error", function () {
                assert(error instanceof Error);
            });

            it("should be the expected message", function () {
                assert.strictEqual(error.message, "Aruguments are not passed fully.");
            });
        });

        describe("the arg2 is `null`", function () {
            var error = null;

            before(function(){
                var gSubject = new ObserverSubject();

                try {
                    gSubject.add("test", null);
                }
                catch (e) {
                    error = e;
                }
            });

            it("should be the instance of Error", function () {
                assert(error instanceof Error);
            });

            it("should be the expected message", function () {
                assert.strictEqual(error.message, "Aruguments are not passed fully.");
            });
        });

        describe("the arg2 doesn't have `handleMessage` method", function () {
            var error = null;

            before(function(){
                var gSubject = new ObserverSubject();

                try {
                    gSubject.add("test", Object.create(null));
                }
                catch (e) {
                    error = e;
                }
            });

            it("should be the instance of Error", function () {
                assert(error instanceof Error);
            });

            it("should be the expected message", function () {
                assert.strictEqual(error.message, "Not implement observer interface.");
            });
        });

        describe("the type of arg2's `handleMessage` method is not a function", function () {
            var error = null;

            before(function(){
                var gSubject = new ObserverSubject();
                var gObserver = {
                    handleMessage: "test"
                };

                try {
                    gSubject.add("test", {
                        handleMessage: "test"
                    });
                }
                catch (e) {
                    error = e;
                }
            });

            it("should be the instance of Error", function () {
                assert(error instanceof Error);
            });

            it("should be the expected message", function () {
                assert.strictEqual(error.message, "Not implement observer interface.");
            });
        });
    });

});

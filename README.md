# connect-lrdd

Link-based Resource Descriptor Document (LRDD) middleware middleware for [Connect](http://senchalabs.github.com/connect/)
and [Express](http://expressjs.com/).

LRDD is mechanism used to discover metadata about resources available on the
Internet.  It defines the protocol and document formats used for other discovery
protocols such as [Web Host Metadata](http://tools.ietf.org/html/rfc6415) and
[WebFinger](http://code.google.com/p/webfinger/).

## Installation

    $ npm install connect-lrdd

## Usage

#### Middleware

To service LRDD requests, use `lrdd.descriptor()` middleware in your application.

    app.get('/lrdd', lrdd.descriptor(function(uri, done) {
      Resource.findByUri({ uri: uri }, function (err, resource) {
        if (err) { return done(err); }
        var desc = new lrdd.Descriptor(uri);
        // add properties and links to descriptor...
        return done(null, desc);
      });
    }));

The function supplied to `lrdd.descriptor()` takes `uri` and a `done` callback
as arguments.  `uri` identifies a resource available at the host.  `done` is a
callback which should be called with descriptor for the resource.  If an
exception occurred, `err` should be set.

#### Examples

For a complete, working example, refer to the [host-meta example](https://github.com/jaredhanson/connect-lrdd/tree/master/examples/host-meta).

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

(The MIT License)

Copyright (c) 2011 Jared Hanson

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

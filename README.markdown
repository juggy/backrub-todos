# Backrub TODOs example

Partly copied and adapted from the original example by Jerome https://github.com/jeromegn/localtodos .

# What is Backrub

Backrub lets you describe your Backbone view layer in a single template that will automatically refresh when the bounded data changes. It uses Handlebars and is inspired by SproutCore (>= 1.5) SC.TemplateView .

## Basic use

* Create your template
* Load it in a Backbone.Backrub object
* render it and append it to your page (somewhere, the body maybe)
* Make it alive to start all eventing and make your views behave as intended

## Things to know:

* If you do not call makeAlive your views will not receive events
* Any defined render method will be redefined by the template
* You can declare an alive function on your view to handle last minute initialization

# More...

Check out Backrub Github repo at https://github.com/juggy/Backrub

# License (MIT)

Copyright (c) 2010 Julien Guimont <julien.guimont@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# Special thanks

* Jerome Gravel-Niquet <jeromegn@gmail.com>

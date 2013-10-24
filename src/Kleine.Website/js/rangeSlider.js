$.widget("jp.rangeSlider",
    {
        minMaxDifference: 0,
        options:
            {
                min: 0,
                max: 1,
                range: 32,
                unitConversion: function (value) { return value; }
            },
        _create: function () {
            var self = this;
            this.minMaxDifference = this.options.max - this.options.min;
            this.element.addClass("rangeSlider");
            this.element.append('<div class="range"></div>');
            this.element.append('<input type="hidden" name="' + this.element.attr("id") + '" />');
            this.element.find(".range").draggable(
                {
                    axis: "x",
                    containment: "parent",
                    drag: function () {
                        var range = $(this);
                        var left = parseFloat(range.css("left"));

                        var rangeMinValue = self.options.unitConversion(left / self.pixelPerValue + self.options.min);
                        var rangeMaxValue = self.options.unitConversion(left / self.pixelPerValue + self.options.min + self.options.range);
                        range.find(".label.min").text(rangeMinValue);
                        range.find(".label.max").text(rangeMaxValue);

                        self.element.find("input").val('{min: "' + rangeMinValue + '", max: "' + rangeMaxValue + '"}');
                    }
                }
            );

            this.resize();
        },

        resize: function () {
            // rebuild the labels when we resize to match the sliding range's width
            this.pixelPerValue = this.element.width() / this.minMaxDifference;
            this.element.find(".range").css("width", this.options.range * this.pixelPerValue + "px")
            this.element.find(".range div").remove();
            this.element.find(".range").append('<div class="label min">' + this.options.unitConversion(this.options.min) + '</div><div class="label max">' + this.options.unitConversion(this.options.min + this.options.range) + '</div>');
        },
        destroy: function () {
            this.element
                .removeClass("rangeSlider").remove(".range");
            // Call the base destroy function.
            $.Widget.prototype.destroy.call(this);
        }
    }
);
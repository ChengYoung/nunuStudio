"use strict";

function ImagePanel(parent, obj)
{
	ResourcePanel.call(this, parent, obj);

	var self = this;

	this.form.addText("Image");
	this.image = new ImageChooser(this.form.element);
	this.image.size.set(120, 120);
	this.form.add(this.image);
	this.form.nextRow();
}

ImagePanel.prototype = Object.create(ResourcePanel.prototype);

ImagePanel.prototype.updatePanel = function()
{
	ResourcePanel.prototype.updatePanel.call(this);

	this.image.setValue(this.obj);
};
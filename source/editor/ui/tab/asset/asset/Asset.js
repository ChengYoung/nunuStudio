"use strict";

function Asset(parent)
{
	Element.call(this, parent);

	this.asset = null;

	this.element.style.cursor = "pointer";

	//Icon
	this.icon = document.createElement("img");
	this.icon.draggable = false;
	this.icon.style.position = "absolute";
	this.icon.style.bottom = "20px";
	this.icon.style.right = "5px";
	this.icon.style.width = "30%";
	this.icon.style.height = "30%";
	this.icon.style.pointerEvents = "none";
	this.icon.style.opacity = "0.5";
	this.icon.style.zIndex = "1";
	this.element.appendChild(this.icon);

	//Text
	this.text = document.createElement("div");
	this.text.style.position = "absolute";
	this.text.style.visibility = "inherit";
	this.text.style.overflow = "hidden";
	this.text.style.textAlign = "center";
	this.text.style.pointerEvents = "none";
	this.text.style.textOverflow = "ellipsis";
	this.text.style.whiteSpace = "nowrap";
	this.text.style.color = Editor.theme.textColor;
	this.text.style.height = "20px";
	this.text.style.width = "100%";
	this.text.style.bottom = "0px";
	this.element.appendChild(this.text);

	//Text
	this.name = document.createTextNode("");
	this.text.appendChild(this.name);

	//Icon scale
	this.scale = new THREE.Vector2(0.65, 0.65);

	var self = this;

	this.element.onmouseenter = function()
	{
		this.style.backgroundColor = Editor.theme.buttonOverColor;
	};

	this.element.onmouseleave = function()
	{
		if(!Editor.isObjectSelected(self.asset))
		{
			this.style.backgroundColor = "";
		}
	};

	this.element.onclick = function(event)
	{
		if(event.ctrlKey)
		{
			if(Editor.isObjectSelected(self.asset))
			{
				Editor.removeFromSelection(self.asset);
			}
			else
			{
				Editor.addToSelection(self.asset);
			}
		}
		else
		{
			Editor.selectObject(self.asset);
		}
	};
}

Asset.prototype = Object.create(Element.prototype);

//Update background based on selection state
Asset.prototype.updateSelection = function()
{
	this.element.style.backgroundColor = Editor.isObjectSelected(this.asset) ? Editor.theme.buttonOverColor : "";
};

//Set parent
Asset.prototype.setParent = function(parent)
{
	if(parent !== this.parent)
	{
		this.parent = parent;
		this.parent.appendChild(this.element);
	}
};

//Set file icon
Asset.prototype.setIcon = function(icon)
{
	this.icon.src = icon;
};

//Set file label
Asset.prototype.setText = function(text)
{
	this.name.data = text;
};

//Update metadata
Asset.prototype.updateMetadata = function()
{
	this.setText(this.asset.name);
};

//Update Interface
Asset.prototype.updateInterface = function()
{
	if(this.visible)
	{
		this.element.style.visibility = "visible";
		this.element.style.top = this.position.y + "px";
		this.element.style.left = this.position.x + "px";
		this.element.style.width = this.size.x + "px";
		this.element.style.height = this.size.y + "px";
	}
	else
	{
		this.element.style.visibility = "hidden";
	}
};
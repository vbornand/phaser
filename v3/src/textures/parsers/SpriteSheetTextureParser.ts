/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2016 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Parse a Sprite Sheet and extracts the frame data from it.
*
* @class Phaser.TextureParser.SpriteSheet
* @static
* @param {Phaser.Texture} texture - The parent Texture.
* @param {string} key - The key of the Frame within the Texture that the Sprite Sheet is stored in.
* @param {number} frameWidth - The fixed width of each frame.
* @param {number} frameHeight - The fixed height of each frame.
* @param {number} [startFrame=0] - Skip a number of frames. Useful when there are multiple sprite sheets in one Texture.
* @param {number} [endFrame=-1] - The total number of frames to extract from the Sprite Sheet. The default value of -1 means "extract all frames".
* @param {number} [margin=0] - If the frames have been drawn with a margin, specify the amount here.
* @param {number} [spacing=0] - If the frames have been drawn with spacing between them, specify the amount here.
* @return {Phaser.FrameData} A FrameData object containing the parsed frames.
*/
export default function (texture, sourceIndex, x, y, width, height, frameWidth, frameHeight, startFrame, endFrame, margin, spacing)
{
    if (startFrame === undefined) { startFrame = 0; }
    if (endFrame === undefined) { endFrame = -1; }
    if (margin === undefined) { margin = 0; }
    if (spacing === undefined) { spacing = 0; }

    var row = Math.floor((width - margin) / (frameWidth + spacing));
    var column = Math.floor((height - margin) / (frameHeight + spacing));
    var total = row * column;

    if (startFrame > total || startFrame < -total)
    {
        startFrame = 0;
    }

    if (startFrame < 0)
    {
        //  Allow negative skipframes.
        startFrame = total + startFrame;
    }

    if (endFrame !== -1)
    {
        total = startFrame + (endFrame + 1);
    }

    var fx = margin;
    var fy = margin;
    var ax = 0;
    var ay = 0;

    for (var i = 0; i < total; i++)
    {
        ax = 0;
        ay = 0;

        var w = fx + frameWidth;
        var h = fy + frameHeight;

        if (w > width)
        {
            ax = w - width;
        }

        if (h > height)
        {
            ay = h - height;
        }

        texture.add(i, sourceIndex, x + fx, y + fy, frameWidth - ax, frameHeight - ay);

        fx += frameWidth + spacing;

        if (fx + frameWidth > width)
        {
            fx = margin;
            fy += frameHeight + spacing;
        }
    }

    return texture;
}

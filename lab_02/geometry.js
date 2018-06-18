function volumeOfRectangularPrism (length, width, height) {
    if (arguments.length != 3) {
        throw "Errer! Wrong argument number.";
    }
    if (typeof(length) != 'number' || typeof(width) != 'number' || typeof(height) != 'number') {
        throw "Errer! Arguments show be numbers.";
    }
    if (isNaN(length) || isNaN(width) || isNaN(height)) {
        throw "Errer! NaN arugument is not accepted.";
    }
    if (length <= 0 || width <= 0 || height <= 0) {
        throw "Errer! Arguments should be positive."
    }

    return length * width * height;

}

function surfaceAreaOfRectangularPrism (length, width, height) {
    if (arguments.length != 3) {
        throw "Errer! Wrong argument number.";
    }
    if (typeof(length) != 'number' || typeof(width) != 'number' || typeof(height) != 'number') {
        throw "Errer! Arguments show be numbers.";
    }
    if (isNaN(length) || isNaN(width) || isNaN(height)) {
        throw "Errer! NaN arugument is not accepted.";
    }
    if (length <= 0 || width <= 0 || height <= 0) {
        throw "Errer! Arguments should be positive."
    }

    return 2 * length * width + 2 * length * height + 2 * width * height;
}

function volumeOfSphere (radius) {
    if (arguments.length != 1) {
        throw "Errer! Wrong argument number.";
    }
    if (typeof(radius) != 'number') {
        throw "Errer! Argument show be number.";
    }
    if (isNaN(radius)) {
        throw "Errer! NaN arugument is not accepted.";
    }
    if (radius <= 0) {
        throw "Errer! Arguments should be positive."
    }

    return 4 / 3 * Math.PI * radius * radius * radius;
}

function surfaceAreaOfSphere (radius) {
    if (arguments.length != 1) {
        throw "Errer! Wrong argument number.";
    }
    if (typeof(radius) != 'number') {
        throw "Errer! Argument show be number.";
    }
    if (isNaN(radius)) {
        throw "Errer! NaN arugument is not accepted.";
    }
    if (radius <= 0) {
        throw "Errer! Arguments should be positive."
    }

    return 4 * Math.PI * radius * radius;

    console.log(123);
}

module.exports = {
    volumeOfRectangularPrism,
    surfaceAreaOfRectangularPrism,
    volumeOfSphere,
    surfaceAreaOfSphere
}

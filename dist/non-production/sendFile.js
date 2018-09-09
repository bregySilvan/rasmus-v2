var options = {
    root: __dirname + "/" + this.config.publicFilesLocation,
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
};
res.sendFile(this.config.publicConfigfileName, options, function (err) {
    if (err) {
        console.error(err);
        res.send(err);
        res.status(404);
    }
    else
        res.status(200);
    res.end();
});
//# sourceMappingURL=sendFile.js.map
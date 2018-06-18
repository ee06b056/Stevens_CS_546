const express = require("express");
const router = express.Router();
const user_db = require("../data/users");
const cuisine_db = require("../data/cuisines");
const comment_db = require("../data/comments");
const user_auth = require("../utilities/user_auth");
router.use(user_auth);

router.get("/", function (req, res) {
    try {
        if (!req.user) {
            res.render('index.handlebars');

        } else if (req.user.status == 1) {
            res.render('manager.handlebars', { mark: req.user.username });
        }
        else {
            res.render('index.handlebars', { mark: req.user.username });
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: "page not found" });
    }

})

router.get("/manager", function (req, res) {
    try {

        res.render('index.handlebars', { mark: req.user.username });
    }
    catch (error) {
        res.status(404).json({ message: "page not found" });
    }

})

router.get("/contact", function (req, res) {
    try {
        res.render('contact.handlebars');
    }
    catch (error) {
        res.status(404).json({ message: "page not found" });
    }
});
router.post("/update", async function (req, res) {
    try {
        let name = req.body.cname;
        let area = req.body.area;
        let url = req.body.url;
        let ingre = req.body.ingre;
        let step = req.body.step;

        let ingre_arr = ingre.replace(/^\s+|\s+$/g,'').replace(/\s*,\s*/g, ",").split(',');
        let steps_arr = step.replace(/^\s+|\s+$/g,'').replace(/\s*,\s*/g, ",").split(',');
        await cuisine_db.updateCuisine(name, url, area, ingre_arr, steps_arr);
        res.redirect("/dashboard");
    }
    catch (error) {
        res.status(404).json({ message: "page not found" });
    }
});
router.get("/login", function (req, res) {
    try {
        res.render('login.handlebars');
    }
    catch (error) {
        res.status(404).json({ message: "page not found" });
    }
});

router.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    const status = await user_db.isAuthenticated(username, password);
    const user = await user_db.getUserByName(username);
    if (status == 2) {
        res.cookie("user_id", user._id, { expires: new Date(Date.now() + 900000), httpOnly: true });
        res.redirect("/");

    }
    else if (status == 1) {
        res.cookie("user_id", user._id, { expires: new Date(Date.now() + 900000), httpOnly: true });
        res.redirect("/");
    }
    else
        (res.render('error.handlebars'));
})

router.post('/regi', async (req, res) => {
    let username = req.body.Name;
    let password = req.body.Password;
    await user_db.addUser(username, password);
    res.render('login.handlebars');
});
router.post('/insertComment', async function (req, res) {
    let username = req.user.username;
    let cuisinename = req.cookies.cuisinename;
    let comment = req.body.comment;
    await comment_db.addComments(username, cuisinename, comment);
    let comments = await comment_db.getCommentsByName(cuisinename);
    let data = comments[comments.length - 1]
    res.send(data);
});
router.get('/dashboard', async (req, res) => {
    let result_arr = await cuisine_db.getAllCuisine();
    res.render('dashboard.handlebars', { cuisines: result_arr });
});
router.get('/intro', async (req, res) => {
    let cid = req.query.id;
    const result_area = await cuisine_db.getCuisineByArea(cid);
    res.render('area.handlebars', { factor: result_area });

});
router.get('/comment', async (req, res) => {
    if (!req.user) {
        res.redirect("/login");
    } else {
        let cid = req.query.id;
        const result_area = await cuisine_db.getCuisineByName(cid);
        const comments = await comment_db.getCommentsByName(cid);
        res.cookie("cuisinename", cid);
        res.render('comment.handlebars', { factor: result_area, comts: comments, Cname: cid, mark: req.user.username });
    }


});

router.get("/logout", function (req, res, next) {
    try {

        res.clearCookie('user_id');
        res.render('logout.handlebars');



    } catch (error) {
        res.status(404).json({ message: "page not found" });
    }

});

router.post("/search", async function (req, res, next) {
    try {
        if (!req.user) {
            res.redirect('login');
        }
        else {
            let result_arr = await cuisine_db.getCuisines(req.body.factor);
            let cuisine_arr = [];
            for (let i = 0; i < result_arr.length; i++) {
                cuisine_arr[i] = JSON.stringify(result_arr[i]);
            }

            res.render('result', { cuisines: result_arr });

        }






    } catch (error) {
        res.status(404).json({ message: "page not found" });
    }

})
module.exports = router;
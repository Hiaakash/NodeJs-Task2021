var jwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const {sequelize,User} = require('./models')
require('dotenv').config();



module.exports = function(passport){
    console.log("OK OK OK")
    passport.use(
        new jwtStrategy({
            secretOrKey : process.env.ACCESS_TOKEN_SECRET,
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async function (jwt_payload,done){
            console.log(jwt_payload);
            try {
                const user = await User.findOne({where :{ email: jwt_payload.email }});
                if (!user) {
                  return done(null, false, { message: 'User not found' });
                }
                return done(null, user, { message: 'Logged in Successfully' });
              } catch (error) {
                return done(error);
              }
            }
        )
        )
    }

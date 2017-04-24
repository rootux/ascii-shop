export default (moment) => {
    'ngInject';
    return (input) => {
        let inputInMoment = moment(input);
        
        if(isMoreThenOneWeek(inputInMoment)) {
            return inputInMoment.format("MM-DD-YYYY");
        }else {
            return inputInMoment.fromNow();
        }

        function isMoreThenOneWeek(inputInMoment) {
            return inputInMoment.isBefore(moment().day(-7));
        }
    };
}
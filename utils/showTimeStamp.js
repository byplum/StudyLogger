module.exports = time_ms => {
    if (time_ms < 60 * 1000) {
        const time_s = Math.trunc(time_ms / 1000)
        return `${time_s}  ${time_s === 1 ? 'second' : 'seconds'} ago`;
    } else if (time_ms < 60 * 60 * 1000) {
        const time_min = Math.trunc(time_ms / (60 * 1000))
        return `${time_min}  ${time_min === 1 ? 'minute' : 'minutes'} ago`;
    } else if (time_ms < 24 * 60 * 60 * 1000) {
        const time_h = Math.trunc(time_ms / (60 * 60 * 1000))
        return `${time_h}  ${time_h === 1 ? 'hour' : 'hours'} ago`;
    } else if (time_ms < 7 * 24 * 60 * 60 * 1000) {
        const time_d = Math.trunc(time_ms / (24 * 60 * 60 * 1000))
        return `${time_d}  ${time_d === 1 ? 'day' : 'days'} ago`;
    } else if (time_ms < 30 * 24 * 60 * 60 * 1000) {
        const time_wk = Math.trunc(time_ms / (7 * 24 * 60 * 60 * 1000))
        return `${time_wk}  ${time_wk === 1 ? 'week' : 'weeks'} ago`;
    } else if (time_ms < 365 * 24 * 60 * 60 * 1000) {
        const time_m = Math.trunc(time_ms / (30 * 24 * 60 * 60 * 1000))
        return `${time_m}  ${time_m === 1 ? 'month' : 'months'} ago`;
    } else {
        const time_yr = Math.trunc(time_ms / (365 * 24 * 60 * 60 * 1000))
        return `${time_yr}  ${time_yr === 1 ? 'year' : 'years'} ago`;
    }
}
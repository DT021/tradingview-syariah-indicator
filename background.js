console.log("Start background js");

let SYARIAH_COMPLIANCE_LIST = []

fetch('./stock-list.json')
  .then(i => i.json())
  .then(list => SYARIAH_COMPLIANCE_LIST = list)
  .catch(e => console.error('Something when wrong', e))

browser.tabs.onUpdated.addListener(listener, filter = {
  urls: [
    '*://www.tradingview.com/screener/*',
    '*://www.tradingview.com/chart/*'
  ],
  windowId: browser.windows.WINDOW_ID_CURRENT
})
// browser.tabs.onRemoved.addListener(listener)

function listener(id) {
  try {
    browser.tabs.sendMessage(id, {list: SYARIAH_COMPLIANCE_LIST})
  } catch (e) {
    console.error('Error Send message', e)
  }
}

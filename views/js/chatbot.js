
  window.watsonAssistantChatOptions = {
    integrationID: "d45866d9-4c21-43cc-a04d-e109970df1b0", // The ID of this integration.
    region: "us-south", // The region your integration is hosted in.
    serviceInstanceID: "a8565a01-37b8-44b4-b5bf-5fc0d636e7a6", // The ID of your service instance.
    onLoad: function(instance) { instance.render(); }
  };
  setTimeout(function(){
    const t=document.createElement('script');
    t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
  });

document.querySelectorAll('if').forEach(ifElement => {
      const condition = ifElement.getAttribute('c');
      const elseElement = ifElement.querySelector('else');
      
      let fElement = null;
      let nextNode = ifElement.nextSibling;
      while (nextNode && !fElement) {
        if (nextNode.nodeName === 'F') fElement = nextNode;
        nextNode = nextNode.nextSibling;
      }

      try {
        const result = Function(`return (${condition})`)();

        if (result) {
          if (elseElement) elseElement.remove();
        } else {
          if (elseElement) {
            let node = ifElement.firstChild;
            while (node && node !== elseElement) {
              const next = node.nextSibling;
              node.remove();
              node = next;
            }
            elseElement.replaceWith(...elseElement.childNodes);
          } else {
            ifElement.innerHTML = '';
          }
        }

        if (fElement) fElement.remove();
        ifElement.replaceWith(...ifElement.childNodes);

      } catch (error) {
        console.error("ERRO NA CONDIÇÃO:", error);
      }
    });

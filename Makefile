.PHONY: open serve

open:
	open index.html

serve:
	python3 -m http.server 8080

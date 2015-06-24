//outputs a mailto link in the form:
//<a href="mailto:[addr]@[domain]">[addr]@[domain]</a>
function printEmailLink(addr, domain, link)
{
	//var domain = 'stanford.edu';
	document.write('<a href=\"mailto:' + addr + '@' + domain + '\">');
	document.write(link + '</a>');
}
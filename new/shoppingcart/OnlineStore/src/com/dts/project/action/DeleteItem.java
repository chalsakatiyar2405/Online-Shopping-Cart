/*
 * Generated by MyEclipse Struts
 * Template path: templates/java/JavaClass.vtl
 */
package com.dts.project.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.dts.core.util.LoggerManager;
import com.dts.crsm.dao.ItemDAO;

/** 
 * MyEclipse Struts
 * Creation date: 12-24-2008
 * 
 * XDoclet definition:
 * @struts.action validate="true"
 */
public class DeleteItem extends Action {
	/*
	 * Generated Methods
	 */

	/** 
	 * Method execute
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return ActionForward
	 */
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
	try{
		boolean flag=false;
            ItemDAO aItemdao = new ItemDAO();
            String ch[] = request.getParameterValues("ch");
            
            for(int i=0;i<ch.length;i++)
            {
              flag= aItemdao.deleteItem(Integer.parseInt(ch[i]));
            }
            return mapping.findForward("deleteSuccess");
         }
         catch(Exception e)
         {
           LoggerManager.writeLogWarning(e);
         }
         return mapping.findForward("deleteFail");
	}
	
}